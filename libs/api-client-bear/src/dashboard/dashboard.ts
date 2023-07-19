// (C) 2019-2023 GoodData Corporation
import { GdcExport, GdcFilterContext, sanitizeFiltersForExport } from "@gooddata/api-model-bear";
import { ApiResponse, XhrModule } from "../xhr.js";
import { handleHeadPolling, IPollingOptions } from "../util.js";
import { isExportFinished } from "../utils/export.js";

interface IDashboardExportPayload {
    dashboardExport: {
        dashboardUri: string;
        filters?: GdcFilterContext.FilterContextItem[];
    };
}

export class DashboardModule {
    constructor(private xhr: XhrModule) {}

    public async exportToPdf(
        projectId: string,
        dashboardUri: string,
        filters: GdcFilterContext.FilterContextItem[] = [],
        pollingOptions: IPollingOptions = {},
    ): Promise<GdcExport.IExportResponse> {
        const sanitizedFilters = sanitizeFiltersForExport(filters);
        const payload = this.getDashboardExportPayload(dashboardUri, sanitizedFilters);

        const response: ApiResponse = await this.xhr.post(
            `/gdc/internal/projects/${projectId}/exportDashboard`,
            { body: payload },
        );

        return this.pollPdfFile(response, pollingOptions);
    }

    private async pollPdfFile(
        response: ApiResponse,
        pollingOptions: IPollingOptions,
    ): Promise<GdcExport.IExportResponse> {
        const data: GdcExport.IExportResponse = response.getData();
        return handleHeadPolling(this.xhr.head.bind(this.xhr), data.uri, isExportFinished, {
            ...pollingOptions,
            blobContentType: "application/pdf",
        });
    }

    private getDashboardExportPayload(
        dashboardUri: string,
        filters: GdcFilterContext.FilterContextItem[],
    ): IDashboardExportPayload {
        if (filters.length) {
            return {
                dashboardExport: {
                    dashboardUri,
                    filters,
                },
            };
        }

        // minimize payload
        return {
            dashboardExport: {
                dashboardUri,
            },
        };
    }
}
