// (C) 2007-2023 GoodData Corporation
import { IColorPalette, ITheme } from "@gooddata/sdk-model";
import { DataViewFacade, DefaultColorPalette, VisualizationTypes } from "@gooddata/sdk-ui";
import { IColorMapping } from "../../../interfaces";
import {
    isBubbleChart,
    isBulletChart,
    isHeatmap,
    isOneOfTypes,
    isSankeyOrDependencyWheel,
    isScatterPlot,
    isTreemap,
    isWaterfall,
} from "../_util/common";
import BulletChartColorStrategy from "../bulletChart/bulletChartColoring";
import { MeasureColorStrategy } from "../_chartColoring/measure";
import { AttributeColorStrategy, IColorStrategy } from "@gooddata/sdk-ui-vis-commons";
import { HeatmapColorStrategy } from "../heatmap/heatmapColoring";
import { TreemapColorStrategy } from "../treemap/treemapColoring";
import { BubbleChartColorStrategy } from "../bubbleChart/bubbleChartColoring";
import { ScatterPlotColorStrategy } from "../scatterPlot/scatterPlotColoring";
import { SankeyChartColorStrategy } from "../sankeyChart/sankeyChartColoring";
import { WaterfallChartColorStrategy } from "../waterfallChart/waterfallChartColoring";

const attributeChartSupportedTypes = [
    VisualizationTypes.PIE,
    VisualizationTypes.DONUT,
    VisualizationTypes.FUNNEL,
    VisualizationTypes.PYRAMID,
    VisualizationTypes.SCATTER,
    VisualizationTypes.BUBBLE,
    VisualizationTypes.SANKEY,
    VisualizationTypes.DEPENDENCY_WHEEL,
];

function isAttributeColorPalette(type: string, dv: DataViewFacade, stackByAttribute: any) {
    const attributeChartSupported = isOneOfTypes(type, attributeChartSupportedTypes);
    return stackByAttribute || (attributeChartSupported && dv.def().hasAttributes());
}

export class ColorFactory {
    public static getColorStrategy(
        colorPalette: IColorPalette = DefaultColorPalette,
        colorMapping: IColorMapping[],
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        viewByAttribute: any,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        viewByParentAttribute: any,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        stackByAttribute: any,
        dv: DataViewFacade,
        type: string,
        theme?: ITheme,
    ): IColorStrategy {
        if (isHeatmap(type)) {
            return new HeatmapColorStrategy(
                colorPalette,
                colorMapping,
                viewByAttribute,
                stackByAttribute,
                dv,
                theme,
            );
        }

        if (isTreemap(type)) {
            return new TreemapColorStrategy(
                colorPalette,
                colorMapping,
                viewByAttribute,
                stackByAttribute,
                dv,
                theme,
            );
        }

        if (isScatterPlot(type)) {
            return new ScatterPlotColorStrategy(
                colorPalette,
                colorMapping,
                viewByAttribute,
                stackByAttribute,
                dv,
                theme,
            );
        }

        if (isBubbleChart(type)) {
            return new BubbleChartColorStrategy(
                colorPalette,
                colorMapping,
                viewByAttribute,
                stackByAttribute,
                dv,
                theme,
            );
        }

        if (isBulletChart(type)) {
            return new BulletChartColorStrategy(
                colorPalette,
                colorMapping,
                viewByAttribute,
                stackByAttribute,
                dv,
                theme,
            );
        }

        if (isSankeyOrDependencyWheel(type)) {
            return new SankeyChartColorStrategy(
                colorPalette,
                colorMapping,
                viewByParentAttribute,
                viewByAttribute,
                dv,
                theme,
            );
        }

        if (isWaterfall(type)) {
            return new WaterfallChartColorStrategy(
                colorPalette,
                colorMapping,
                viewByParentAttribute,
                viewByAttribute,
                dv,
            );
        }

        if (isAttributeColorPalette(type, dv, stackByAttribute)) {
            return new AttributeColorStrategy(
                colorPalette,
                colorMapping,
                viewByAttribute,
                stackByAttribute,
                dv,
                theme,
            );
        }

        return new MeasureColorStrategy(
            colorPalette,
            colorMapping,
            viewByAttribute,
            stackByAttribute,
            dv,
            theme,
        );
    }
}
