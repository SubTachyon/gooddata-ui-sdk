// (C) 2021-2023 GoodData Corporation
import {
    DashboardInitialized,
    DashboardDeinitialized,
    DashboardSaved,
    DashboardCopySaved,
    DateFilterValidationFailed,
    DashboardRenamed,
    DashboardWasReset,
    DashboardExportToPdfResolved,
    DashboardExportToPdfRequested,
    DashboardSharingChanged,
} from "./dashboard";
import {
    DashboardCommandFailed,
    DashboardCommandRejected,
    DashboardCommandStarted,
    DashboardQueryCompleted,
    DashboardQueryFailed,
    DashboardQueryRejected,
    DashboardQueryStarted,
} from "./general";
import {
    DashboardAttributeFilterAdded,
    DashboardAttributeFilterMoved,
    DashboardAttributeFilterParentChanged,
    DashboardAttributeFilterRemoved,
    DashboardAttributeFilterSelectionChanged,
    DashboardDateFilterSelectionChanged,
    DashboardAttributeTitleChanged,
    DashboardFilterContextChanged,
} from "./filters";
import {
    DashboardLayoutChanged,
    DashboardLayoutSectionAdded,
    DashboardLayoutSectionHeaderChanged,
    DashboardLayoutSectionItemMoved,
    DashboardLayoutSectionItemRemoved,
    DashboardLayoutSectionItemReplaced,
    DashboardLayoutSectionItemsAdded,
    DashboardLayoutSectionMoved,
    DashboardLayoutSectionRemoved,
} from "./layout";
import {
    DashboardKpiWidgetChanged,
    DashboardKpiWidgetComparisonChanged,
    DashboardKpiWidgetFilterSettingsChanged,
    DashboardKpiWidgetHeaderChanged,
    DashboardKpiWidgetDescriptionChanged,
    DashboardKpiWidgetConfigurationChanged,
    DashboardKpiWidgetMeasureChanged,
    DashboardKpiWidgetDrillRemoved,
    DashboardKpiWidgetDrillSet,
} from "./kpi";
import {
    DashboardInsightWidgetChanged,
    DashboardInsightWidgetDrillsModified,
    DashboardInsightWidgetDrillsRemoved,
    DashboardInsightWidgetFilterSettingsChanged,
    DashboardInsightWidgetHeaderChanged,
    DashboardInsightWidgetDescriptionChanged,
    DashboardInsightWidgetInsightSwitched,
    DashboardInsightWidgetVisPropertiesChanged,
    DashboardInsightWidgetVisConfigurationChanged,
    DashboardInsightWidgetExportRequested,
    DashboardInsightWidgetExportResolved,
    DashboardInsightWidgetRefreshed,
} from "./insight";
import {
    DashboardWidgetExecutionStarted,
    DashboardWidgetExecutionSucceeded,
    DashboardWidgetExecutionFailed,
} from "./widget";
import { DashboardAlertCreated, DashboardAlertUpdated, DashboardAlertsRemoved } from "./alerts";
import { DashboardScheduledEmailCreated, DashboardScheduledEmailSaved } from "./scheduledEmail";
import { DashboardUserInteractionTriggered } from "./userInteraction";
import { Action } from "@reduxjs/toolkit";
import {
    DashboardRenderRequested,
    DashboardAsyncRenderRequested,
    DashboardAsyncRenderResolved,
    DashboardRenderResolved,
} from "./render";
import {
    DashboardDrillRequested,
    DashboardDrillResolved,
    DashboardDrillDownRequested,
    DashboardDrillDownResolved,
    DashboardDrillToAttributeUrlRequested,
    DashboardDrillToAttributeUrlResolved,
    DashboardDrillToCustomUrlRequested,
    DashboardDrillToCustomUrlResolved,
    DashboardDrillToInsightRequested,
    DashboardDrillToInsightResolved,
    DashboardDrillToDashboardRequested,
    DashboardDrillToDashboardResolved,
    DashboardDrillToLegacyDashboardRequested,
    DashboardDrillToLegacyDashboardResolved,
    DashboardDrillableItemsChanged,
} from "./drill";
import { DashboardRenderModeChanged } from "./renderMode";
import { CreateInsightRequested } from "./lab";

export {
    IDashboardEvent,
    DashboardEventType,
    isDashboardEvent,
    ICustomDashboardEvent,
    isCustomDashboardEvent,
    isDashboardEventOrCustomDashboardEvent,
    DashboardEventBody,
} from "./base";

export {
    DateFilterValidationFailed,
    DateFilterValidationFailedPayload,
    DashboardInitialized,
    DashboardInitializedPayload,
    DashboardDeinitialized,
    DashboardDeinitializedPayload,
    DashboardSaved,
    DashboardSavedPayload,
    DashboardCopySaved,
    DashboardCopySavedPayload,
    DashboardRenamed,
    DashboardRenamedPayload,
    DashboardWasReset,
    DashboardWasResetPayload,
    DashboardDeleted,
    DashboardDeletedPayload,
    DashboardExportToPdfRequested,
    DashboardExportToPdfResolved,
    DashboardExportToPdfResolvedPayload,
    DashboardSharingChanged,
    DashboardSharingChangedPayload,
    isDashboardSaved,
    isDashboardCopySaved,
    isDashboardInitialized,
    isDashboardDeinitialized,
    isDashboardRenamed,
    isDashboardWasReset,
    isDashboardDeleted,
    isDateFilterValidationFailed,
    isDashboardExportToPdfRequested,
    isDashboardExportToPdfResolved,
    isDashboardSharingChanged,
} from "./dashboard";

export {
    DashboardCommandStarted,
    DashboardCommandStartedPayload,
    DashboardCommandRejected,
    DashboardCommandFailed,
    DashboardCommandFailedPayload,
    ActionFailedErrorReason,
    isDashboardCommandStarted,
    isDashboardCommandFailed,
    DashboardQueryRejected,
    DashboardQueryFailed,
    DashboardQueryFailedPayload,
    DashboardQueryStarted,
    DashboardQueryStartedPayload,
    DashboardQueryCompleted,
    DashboardQueryCompletedPayload,
    isDashboardQueryFailed,
    isDashboardCommandRejected,
    isDashboardQueryCompleted,
    isDashboardQueryRejected,
    isDashboardQueryStarted,
} from "./general";

export {
    DashboardDateFilterSelectionChanged,
    DashboardAttributeFilterSelectionChangedPayload,
    DashboardFilterContextChanged,
    DashboardFilterContextChangedPayload,
    DashboardAttributeFilterParentChanged,
    DashboardAttributeFilterParentChangedPayload,
    DashboardAttributeTitleChangedPayload,
    DashboardAttributeFilterRemoved,
    DashboardAttributeFilterRemovedPayload,
    DashboardAttributeFilterSelectionChanged,
    DashboardAttributeTitleChanged,
    DashboardDateFilterSelectionChangedPayload,
    DashboardAttributeFilterMoved,
    DashboardAttributeFilterMovedPayload,
    DashboardAttributeFilterAdded,
    DashboardAttributeFilterAddedPayload,
    isDashboardAttributeFilterAdded,
    isDashboardAttributeFilterMoved,
    isDashboardAttributeFilterParentChanged,
    isDashboardAttributeFilterRemoved,
    isDashboardAttributeFilterSelectionChanged,
    isDashboardAttributeFilterTitleChanged,
    isDashboardDateFilterSelectionChanged,
    isDashboardFilterContextChanged,
} from "./filters";

export {
    DashboardLayoutSectionAdded,
    DashboardLayoutSectionAddedPayload,
    DashboardLayoutSectionMoved,
    DashboardLayoutSectionMovedPayload,
    DashboardLayoutSectionRemoved,
    DashboardLayoutSectionRemovedPayload,
    DashboardLayoutSectionHeaderChanged,
    DashboardLayoutSectionHeaderChangedPayload,
    DashboardLayoutSectionItemsAdded,
    DashboardLayoutSectionItemsAddedPayload,
    DashboardLayoutSectionItemReplaced,
    DashboardLayoutSectionItemReplacedPayload,
    DashboardLayoutSectionItemMoved,
    DashboardLayoutSectionItemMovedPayload,
    DashboardLayoutSectionItemRemoved,
    DashboardLayoutSectionItemRemovedPayload,
    DashboardLayoutChanged,
    DashboardLayoutChangedPayload,
    isDashboardLayoutChanged,
    isDashboardLayoutSectionAdded,
    isDashboardLayoutSectionHeaderChanged,
    isDashboardLayoutSectionItemMoved,
    isDashboardLayoutSectionItemRemoved,
    isDashboardLayoutSectionItemReplaced,
    isDashboardLayoutSectionItemsAdded,
    isDashboardLayoutSectionMoved,
    isDashboardLayoutSectionRemoved,
} from "./layout";

export {
    DashboardKpiWidgetHeaderChanged,
    DashboardKpiWidgetHeaderChangedPayload,
    DashboardKpiWidgetDescriptionChanged,
    DashboardKpiWidgetDescriptionChangedPayload,
    DashboardKpiWidgetConfigurationChanged,
    DashboardKpiWidgetConfigurationChangedPayload,
    DashboardKpiWidgetMeasureChanged,
    DashboardKpiWidgetMeasureChangedPayload,
    DashboardKpiWidgetFilterSettingsChanged,
    DashboardKpiWidgetFilterSettingsChangedPayload,
    DashboardKpiWidgetComparisonChanged,
    DashboardKpiWidgetComparisonChangedPayload,
    DashboardKpiWidgetDrillRemoved,
    DashboardKpiWidgetDrillRemovedPayload,
    DashboardKpiWidgetDrillSet,
    DashboardKpiWidgetDrillSetPayload,
    DashboardKpiWidgetChanged,
    DashboardKpiWidgetChangedPayload,
    isDashboardKpiWidgetChanged,
    isDashboardKpiWidgetComparisonChanged,
    isDashboardKpiWidgetFilterSettingsChanged,
    isDashboardKpiWidgetHeaderChanged,
    isDashboardKpiWidgetDescriptionChanged,
    isDashboardKpiWidgetConfigurationChanged,
    isDashboardKpiWidgetMeasureChanged,
    isDashboardKpiWidgetDrillRemoved,
    isDashboardKpiWidgetDrillSet,
} from "./kpi";

export {
    DashboardInsightWidgetHeaderChanged,
    DashboardInsightWidgetHeaderChangedPayload,
    DashboardInsightWidgetDescriptionChanged,
    DashboardInsightWidgetDescriptionChangedPayload,
    DashboardInsightWidgetFilterSettingsChanged,
    DashboardInsightWidgetFilterSettingsChangedPayload,
    DashboardInsightWidgetVisPropertiesChanged,
    DashboardInsightWidgetVisPropertiesChangedPayload,
    DashboardInsightWidgetVisConfigurationChanged,
    DashboardInsightWidgetVisConfigurationChangedPayload,
    DashboardInsightWidgetInsightSwitched,
    DashboardInsightWidgetInsightSwitchedPayload,
    DashboardInsightWidgetDrillsModified,
    DashboardInsightWidgetDrillsModifiedPayload,
    DashboardInsightWidgetDrillsRemoved,
    DashboardInsightWidgetDrillsRemovedPayload,
    DashboardInsightWidgetChanged,
    DashboardInsightWidgetChangedPayload,
    DashboardInsightWidgetExportRequested,
    DashboardInsightWidgetExportRequestedPayload,
    DashboardInsightWidgetExportResolved,
    DashboardInsightWidgetExportResolvedPayload,
    DashboardInsightWidgetRefreshed,
    DashboardInsightWidgetRefreshedPayload,
    isDashboardInsightWidgetChanged,
    isDashboardInsightWidgetDrillsModified,
    isDashboardInsightWidgetDrillsRemoved,
    isDashboardInsightWidgetFilterSettingsChanged,
    isDashboardInsightWidgetHeaderChanged,
    isDashboardInsightWidgetDescriptionChanged,
    isDashboardInsightWidgetInsightSwitched,
    isDashboardInsightWidgetVisPropertiesChanged,
    isDashboardInsightWidgetVisConfigurationChanged,
    isDashboardInsightWidgetExportRequested,
    isDashboardInsightWidgetExportResolved,
    isDashboardInsightWidgetRefreshed,
} from "./insight";

export {
    DashboardWidgetExecutionStarted,
    DashboardWidgetExecutionStartedPayload,
    DashboardWidgetExecutionSucceeded,
    DashboardWidgetExecutionSucceededPayload,
    DashboardWidgetExecutionFailed,
    DashboardWidgetExecutionFailedPayload,
    isDashboardWidgetExecutionStarted,
    isDashboardWidgetExecutionSucceeded,
    isDashboardWidgetExecutionFailed,
} from "./widget";

export {
    DashboardAlertCreated,
    DashboardAlertCreatedPayload,
    DashboardAlertsRemoved,
    DashboardAlertsRemovedPayload,
    DashboardAlertUpdated,
    DashboardAlertUpdatedPayload,
    isDashboardAlertCreated,
    isDashboardAlertsRemoved,
    isDashboardAlertUpdated,
} from "./alerts";

export {
    DashboardScheduledEmailCreated,
    DashboardScheduledEmailCreatedPayload,
    isDashboardScheduledEmailCreated,
    DashboardScheduledEmailSaved,
    isDashboardScheduledEmailSaved,
} from "./scheduledEmail";

export {
    DashboardDrillRequested,
    DashboardDrillRequestedPayload,
    DashboardDrillResolved,
    DashboardDrillResolvedPayload,
    DashboardDrillDownRequested,
    DashboardDrillDownRequestedPayload,
    DashboardDrillDownResolved,
    DashboardDrillDownResolvedPayload,
    DashboardDrillToAttributeUrlRequested,
    DashboardDrillToAttributeUrlRequestedPayload,
    DashboardDrillToAttributeUrlResolved,
    DashboardDrillToAttributeUrlResolvedPayload,
    DashboardDrillToCustomUrlRequested,
    DashboardDrillToCustomUrlRequestedPayload,
    DashboardDrillToCustomUrlResolved,
    DashboardDrillToCustomUrlResolvedPayload,
    DashboardDrillToInsightRequested,
    DashboardDrillToInsightRequestedPayload,
    DashboardDrillToInsightResolved,
    DashboardDrillToInsightResolvedPayload,
    DashboardDrillToDashboardRequested,
    DashboardDrillToDashboardRequestedPayload,
    DashboardDrillToDashboardResolved,
    DashboardDrillToDashboardResolvedPayload,
    DashboardDrillToLegacyDashboardRequested,
    DashboardDrillToLegacyDashboardRequestedPayload,
    DashboardDrillToLegacyDashboardResolved,
    DashboardDrillToLegacyDashboardResolvedPayload,
    DashboardDrillableItemsChanged,
    DashboardDrillableItemsChangedPayload,
    isDashboardDrillDownRequested,
    isDashboardDrillDownResolved,
    isDashboardDrillRequested,
    isDashboardDrillResolved,
    isDashboardDrillToAttributeUrlRequested,
    isDashboardDrillToAttributeUrlResolved,
    isDashboardDrillToCustomUrlRequested,
    isDashboardDrillToCustomUrlResolved,
    isDashboardDrillToDashboardRequested,
    isDashboardDrillToDashboardResolved,
    isDashboardDrillToInsightRequested,
    isDashboardDrillToInsightResolved,
    isDashboardDrillToLegacyDashboardRequested,
    isDashboardDrillToLegacyDashboardResolved,
    isDashboardDrillableItemsChanged,
} from "./drill";

export {
    DrillTargetsAdded,
    DrillTargetsAddedPayload,
    drillTargetsAdded,
    isDrillTargetsAdded,
} from "./drillTargets";

export * from "./userInteraction";

export {
    DashboardRenderRequested,
    DashboardAsyncRenderRequestedPayload,
    DashboardAsyncRenderRequested,
    DashboardAsyncRenderResolved,
    DashboardAsyncRenderResolvedPayload,
    DashboardRenderResolved,
    isDashboardAsyncRenderRequested,
    isDashboardAsyncRenderResolved,
    isDashboardRenderRequested,
    isDashboardRenderResolved,
} from "./render";

export {
    DashboardRenderModeChanged,
    DashboardRenderModeChangedPayload,
    isDashboardRenderModeChanged,
} from "./renderMode";

export { createInsightRequested, CreateInsightRequested } from "./lab";

/**
 * Union type that contains all available built-in dashboard events.
 *
 * @remarks
 * Note: while this type is marked as public most of the events are currently an alpha-level API that
 * we reserve to change in the following releases. If you use those events now, upgrading to the next
 * version of `@gooddata/sdk-ui-dashboard` will likely result in breakage.
 *
 * @public
 */
export type DashboardEvents =
    //public
    | DashboardInitialized
    | DashboardDeinitialized
    | DateFilterValidationFailed
    | DashboardSaved
    | DashboardCopySaved
    | DashboardRenderRequested
    | DashboardAsyncRenderRequested
    | DashboardAsyncRenderResolved
    | DashboardRenderResolved
    | DashboardSharingChanged
    //beta
    | DashboardRenderModeChanged
    | DashboardCommandStarted<any>
    | DashboardCommandFailed<any>
    | DashboardCommandRejected
    | DashboardQueryFailed
    | DashboardQueryRejected
    | DashboardQueryStarted
    | DashboardQueryCompleted<any, any>
    | DashboardRenamed
    | DashboardWasReset
    | DashboardExportToPdfRequested
    | DashboardExportToPdfResolved
    | DashboardUserInteractionTriggered
    | DashboardDateFilterSelectionChanged
    | DashboardAttributeFilterAdded
    | DashboardAttributeFilterRemoved
    | DashboardAttributeFilterMoved
    | DashboardAttributeFilterSelectionChanged
    | DashboardAttributeTitleChanged
    | DashboardAttributeFilterParentChanged
    | DashboardFilterContextChanged
    | DashboardLayoutSectionAdded
    | DashboardLayoutSectionMoved
    | DashboardLayoutSectionRemoved
    | DashboardLayoutSectionHeaderChanged
    | DashboardLayoutSectionItemsAdded
    | DashboardLayoutSectionItemReplaced
    | DashboardLayoutSectionItemMoved
    | DashboardLayoutSectionItemRemoved
    | DashboardLayoutChanged
    | DashboardKpiWidgetHeaderChanged
    | DashboardKpiWidgetDescriptionChanged
    | DashboardKpiWidgetConfigurationChanged
    | DashboardKpiWidgetMeasureChanged
    | DashboardKpiWidgetFilterSettingsChanged
    | DashboardKpiWidgetComparisonChanged
    | DashboardKpiWidgetDrillRemoved
    | DashboardKpiWidgetDrillSet
    | DashboardKpiWidgetChanged
    | DashboardInsightWidgetHeaderChanged
    | DashboardInsightWidgetDescriptionChanged
    | DashboardInsightWidgetFilterSettingsChanged
    | DashboardInsightWidgetVisPropertiesChanged
    | DashboardInsightWidgetVisConfigurationChanged
    | DashboardInsightWidgetInsightSwitched
    | DashboardInsightWidgetDrillsModified
    | DashboardInsightWidgetDrillsRemoved
    | DashboardInsightWidgetChanged
    | DashboardInsightWidgetExportRequested
    | DashboardInsightWidgetExportResolved
    | DashboardInsightWidgetRefreshed
    | DashboardWidgetExecutionStarted
    | DashboardWidgetExecutionSucceeded
    | DashboardWidgetExecutionFailed
    | DashboardAlertCreated
    | DashboardAlertsRemoved
    | DashboardAlertUpdated
    | DashboardScheduledEmailCreated
    | DashboardScheduledEmailSaved
    //alpha
    | DashboardDrillDownResolved
    | DashboardDrillToAttributeUrlResolved
    | DashboardDrillToCustomUrlResolved
    | DashboardDrillToDashboardResolved
    | DashboardDrillToInsightResolved
    | DashboardDrillToLegacyDashboardResolved
    | DashboardDrillResolved
    | DashboardDrillDownRequested
    | DashboardDrillToAttributeUrlRequested
    | DashboardDrillToCustomUrlRequested
    | DashboardDrillToDashboardRequested
    | DashboardDrillToInsightRequested
    | DashboardDrillToLegacyDashboardRequested
    | DashboardDrillRequested
    | DashboardDrillableItemsChanged
    // internal
    | CreateInsightRequested;

/**
 * Creates DashboardEvent predicate that test whether the provided event matches it.
 *
 * @alpha
 * @param eventType - dashboard event type
 * @param pred - predicate to test
 * @returns boolean - matches?
 */
export function newDashboardEventPredicate<T extends DashboardEvents["type"]>(
    eventType: T,
    pred?: (event: DashboardEvents & { type: T }) => boolean,
) {
    return (event: Action): boolean => {
        if (event?.type !== eventType) {
            return false;
        }
        return pred?.(event as DashboardEvents & { type: T }) ?? true;
    };
}
