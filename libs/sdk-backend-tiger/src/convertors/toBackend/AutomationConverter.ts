// (C) 2024 GoodData Corporation
import {
    ComparisonOperatorEnum,
    RelativeOperatorEnum,
    ArithmeticMeasureOperatorEnum,
    JsonApiAutomationIn,
    JsonApiAutomationPatchAttributesAlert,
} from "@gooddata/api-client-tiger";
import {
    IAutomationAlert,
    IAutomationMetadataObject,
    IAutomationMetadataObjectDefinition,
} from "@gooddata/sdk-model";
import omitBy from "lodash/omitBy.js";
import isEmpty from "lodash/isEmpty.js";
import omit from "lodash/omit.js";
import { v4 as uuidv4 } from "uuid";
import { convertMeasure } from "./afm/MeasureConverter.js";
import { convertAfmFilters } from "./afm/AfmFiltersConverter.js";

export function convertAutomation(
    automation: IAutomationMetadataObject | IAutomationMetadataObjectDefinition,
    exportDefinitionIds?: string[],
): JsonApiAutomationIn {
    const {
        id,
        type,
        description,
        schedule,
        alert,
        tags,
        title,
        recipients,
        details,
        notificationChannel,
        dashboard,
        metadata,
    } = automation;
    const relationships = omitBy(
        {
            exportDefinitions: exportDefinitionIds?.length
                ? {
                      data:
                          exportDefinitionIds?.map((exportDefinitionId) => ({
                              type: "exportDefinition",
                              id: exportDefinitionId,
                          })) ?? [],
                  }
                : undefined,
            recipients: recipients?.length
                ? {
                      data: recipients?.map((r) => ({ type: "user", id: r.id })) ?? [],
                  }
                : undefined,
            notificationChannel: notificationChannel
                ? {
                      data: { type: "notificationChannel", id: notificationChannel },
                  }
                : undefined,
            analyticalDashboard: dashboard
                ? { data: { type: "analyticalDashboard", id: dashboard } }
                : undefined,
        },
        isEmpty,
    );

    const hasRelationships = !isEmpty(relationships);

    const scheduleObj = schedule ? { schedule } : {};
    const alertObj = alert
        ? {
              alert: convertAlert(alert),
          }
        : {};
    const state = alert ? alert.trigger.state : undefined;
    const metadataObj = metadata ? { metadata } : {};

    const attributes = omitBy(
        {
            title,
            description,
            tags,
            details,
            state,
            ...metadataObj,
            ...scheduleObj,
            ...alertObj,
        },
        isEmpty,
    );

    return {
        type,
        id: id ?? uuidv4(),
        attributes,
        ...(hasRelationships
            ? {
                  relationships,
              }
            : {}),
    };
}

const convertAlert = (alert: IAutomationAlert): JsonApiAutomationPatchAttributesAlert => {
    const { condition, execution } = alert;

    const { filters: convertedFilters } = convertAfmFilters(execution.measures, execution.filters);
    const base = {
        execution: {
            filters: convertedFilters,
            measures: execution.measures.map((measure) => {
                return omit(convertMeasure(measure), "alias", "format", "title");
            }),
        },
        trigger: alert.trigger.mode,
    };

    //comparison
    if (condition.type === "comparison") {
        return {
            condition: {
                comparison: {
                    operator: condition.operator as ComparisonOperatorEnum,
                    left: { localIdentifier: condition.left },
                    right: { value: condition.right },
                },
            },
            ...base,
        };
    }

    //relative
    if (condition.type === "relative") {
        return {
            condition: {
                relative: {
                    operator: condition.operator as RelativeOperatorEnum,
                    measure: {
                        operator: condition.measure.operator as ArithmeticMeasureOperatorEnum,
                        left: { localIdentifier: condition.measure.left },
                        right: { localIdentifier: condition.measure.right },
                    },
                    threshold: {
                        ...(condition.measure.operator === ArithmeticMeasureOperatorEnum.CHANGE
                            ? {
                                  value: condition.threshold / 100,
                              }
                            : {
                                  value: condition.threshold,
                              }),
                    },
                },
            },
            ...base,
        };
    }

    throw new Error("Unsupported alert condition type.");
};
