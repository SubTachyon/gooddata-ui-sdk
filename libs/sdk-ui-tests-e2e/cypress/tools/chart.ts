// (C) 2021 GoodData Corporation

export const YAXIS_LABELS_SELECTOR =
    ".highcharts-yaxis-labels text[text-anchor = 'middle'], .highcharts-yaxis-labels text[text-anchor = 'end']";
export const XAXIS_LABELS_SELECTOR =
    ".highcharts-xaxis-labels text[text-anchor = 'middle'], .highcharts-xaxis-labels text[text-anchor = 'end']";
const LEGEND_ICON_SELECTOR = ".viz-legend .series-icon";
const LEGEND_NAME_SELECTOR = ".viz-legend .series-item .series-name";
const TOOLTIP_TITLE_SELECTOR = ".gd-viz-tooltip-title";
const HIGHCHART_POINT_SELECTOR = ".highcharts-point";
const DATA_LABELS_SELECTOR = ".highcharts-data-labels .highcharts-label text";

export class Chart {
    constructor(private parentSelector: string) {}

    getElementSelector() {
        return this.parentSelector;
    }

    getElement() {
        return cy.get(this.getElementSelector());
    }

    scrollIntoView() {
        this.getElement().scrollIntoView();
        return this;
    }

    waitLoaded() {
        this.getElement().find(".s-loading").should("not.exist");
        return this;
    }

    waitComputed() {
        cy.get(".adi-computing-inner").should("not.exist");
        this.getElement().find(".visualization-container-measure-wrap").should("exist");
        return this;
    }

    getHighchartsContainer() {
        return cy.get(this.parentSelector).find(".highcharts-container");
    }

    getContentElement() {
        return cy.get(this.parentSelector).find(".visualization-content");
    }

    clickSeriesPoint(seriesIndex: number, pointIndex = 0) {
        this.getHighchartsContainer()
            .find(`.highcharts-series.highcharts-series-${seriesIndex} .highcharts-point`)
            .eq(pointIndex)
            .click();
        return this;
    }

    hasCountOfDrillPoints(count: number) {
        cy.get(".highcharts-drilldown-point").should("have.length", count);
        return this;
    }

    hasNoDataForFilter() {
        this.getContentElement().contains("No data for your filter selection").should("exist");
    }

    getDataLabelValues() {
        const result: string[] = [];
        this.getHighchartsContainer()
            .find(`.highcharts-data-label text`)
            .each(($li) => {
                return result.push($li.text());
            });
        return cy.wrap(result);
    }

    hasDataLabelValues(labels: string[]) {
        this.getDataLabelValues().should("deep.equal", labels);
        return this;
    }

    clickAxisDrilldownLabel(axis: "x" | "y", index: number) {
        this.getHighchartsContainer()
            .find(`.highcharts-${axis}axis-labels .highcharts-drilldown-axis-label`)
            .eq(index)
            .click();
        return this;
    }

    getYAxisLabelsElements() {
        return cy.get(YAXIS_LABELS_SELECTOR);
    }

    getXAxisLabelElements() {
        return cy.get(XAXIS_LABELS_SELECTOR);
    }

    getYAxisLabels() {
        const result: string[] = [];
        this.getYAxisLabelsElements().each(($li) => {
            return result.push($li.text());
        });
        return cy.wrap(result);
    }

    getXAxisLabels() {
        const result: string[] = [];
        this.getXAxisLabelElements().each(($li) => {
            return result.push($li.text());
        });
        return cy.wrap(result);
    }

    isHighchartsChart(isHighchartsChart: boolean = true) {
        this.getElement()
            .find(".highcharts-root")
            .should(isHighchartsChart ? "exist" : "not.exist");
    }

    public hasLegendColorCount(count: number) {
        this.getElement().find(DATA_LABELS_SELECTOR).should("have.length", count);
    }

    public hasMatchingColorLegend(color: string) {
        this.getElement()
            .find(LEGEND_ICON_SELECTOR)
            .invoke("css", "background-color")
            .then((backgroundColorItem) => {
                expect(backgroundColorItem).eq(color);
            });
    }

    public hasMatchingPercentageLabels(labels: RegExp[]) {
        for (let i = 0; i < labels.length; i++) {
            this.getElement().find(DATA_LABELS_SELECTOR).eq(i).contains(labels[i]).should("exist");
        }
    }

    public assertShortenMetricNameInLegend(width: number) {
        this.assertShortenMetricName(LEGEND_NAME_SELECTOR, width);
    }

    public hoverOnChart1stPointInHigh() {
        cy.get(HIGHCHART_POINT_SELECTOR).first().as("firstElement");
        cy.get("@firstElement").trigger("mouseover", { force: true });
        return this;
    }

    public assertShortenMetricNameInTooltip(width: number) {
        this.assertShortenMetricName(TOOLTIP_TITLE_SELECTOR, width);
    }

    public assertShortenMetricName(element: string, width: number) {
        cy.get(element).invoke("css", "text-overflow").should("equal", "ellipsis");
        cy.get(element).invoke("width").should("equal", width);
        return this;
    }
}
