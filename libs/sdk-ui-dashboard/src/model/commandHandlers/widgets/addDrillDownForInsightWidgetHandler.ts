// (C) 2023 GoodData Corporation

import { SagaIterator } from "redux-saga";
import { put, select } from "redux-saga/effects";

import { objRefToString } from "@gooddata/sdk-model";

import { DashboardContext } from "../../types/commonTypes.js";
import { AddDrillDownForInsightWidget } from "../../commands/index.js";
import { DashboardInsightWidgetDrillDownAdded, insightWidgetDrillDownAdded } from "../../events/insight.js";
import { selectWidgetsMap } from "../../store/layout/layoutSelectors.js";
import { validateExistingInsightWidget } from "./validation/widgetValidations.js";
import { layoutActions } from "../../store/layout/index.js";
import { existBlacklistHierarchyPredicate } from "../../utils/attributeHierarchyUtils.js";

export function* addDrillDownForInsightWidgetHandler(
    ctx: DashboardContext,
    cmd: AddDrillDownForInsightWidget,
): SagaIterator<DashboardInsightWidgetDrillDownAdded> {
    const {
        payload: { attributeIdentifier, attributeHierarchy },
        correlationId,
    } = cmd;
    const widgets: ReturnType<typeof selectWidgetsMap> = yield select(selectWidgetsMap);
    const insightWidget = validateExistingInsightWidget(widgets, cmd, ctx);
    const { ref: widgetRef, ignoredDrillDownHierarchies: currentBlacklistHierarchies } = insightWidget;

    const newBlacklistHierarchies = currentBlacklistHierarchies
        ? currentBlacklistHierarchies.filter(
              (ref) =>
                  !existBlacklistHierarchyPredicate(
                      ref,
                      attributeHierarchy,
                      objRefToString(attributeIdentifier),
                  ),
          )
        : [];

    yield put(
        layoutActions.replaceWidgetBlacklistHierarchies({
            ref: widgetRef,
            blacklistHierarchies: newBlacklistHierarchies,
            undo: {
                cmd,
            },
        }),
    );

    return insightWidgetDrillDownAdded(
        ctx,
        widgetRef,
        attributeHierarchy,
        attributeIdentifier,
        correlationId,
    );
}
