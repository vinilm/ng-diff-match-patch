import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./diffMatchPatch.service";
import * as i2 from "@angular/common";
export class LineCompareComponent {
    constructor(dmp) {
        this.dmp = dmp;
        this.left = '';
        this.right = '';
    }
    ngOnInit() {
        this.updateHtml();
    }
    ngOnChanges() {
        this.updateHtml();
    }
    updateHtml() {
        if (typeof this.left === 'number' || typeof this.left === 'boolean') {
            this.left = this.left.toString();
        }
        if (typeof this.right === 'number' || typeof this.right === 'boolean') {
            this.right = this.right.toString();
        }
        this.calculateLineDiff(this.dmp.getLineDiff(this.left, this.right));
    }
    calculateLineDiff(diffs) {
        const diffCalculation = {
            lines: [],
            lineLeft: 1,
            lineRight: 1
        };
        this.isContentEqual = diffs.length === 1 && diffs[0][0] === 0 /* DiffOp.Equal */;
        if (this.isContentEqual) {
            this.calculatedDiff = [];
            return;
        }
        for (let i = 0; i < diffs.length; i++) {
            const diff = diffs[i];
            let diffLines = diff[1].split(/\r?\n/);
            // If the original line had a \r\n at the end then remove the
            // empty string after it.
            if (diffLines[diffLines.length - 1].length == 0) {
                diffLines.pop();
            }
            switch (diff[0]) {
                case 0 /* DiffOp.Equal */: {
                    const isFirstDiff = i === 0;
                    const isLastDiff = i === diffs.length - 1;
                    this.outputEqualDiff(diffLines, diffCalculation, isFirstDiff, isLastDiff);
                    break;
                }
                case -1 /* DiffOp.Delete */: {
                    this.outputDeleteDiff(diffLines, diffCalculation);
                    break;
                }
                case 1 /* DiffOp.Insert */: {
                    this.outputInsertDiff(diffLines, diffCalculation);
                    break;
                }
            }
        }
        this.calculatedDiff = diffCalculation.lines;
    }
    /* If the number of diffLines is greater than lineContextSize then we may need to adjust the diff
     * that is output.
     *   > If the first diff of a document is DiffOp.Equal then the leading lines can be dropped
     *     leaving the last 'lineContextSize' lines for context.
     *   > If the last diff of a document is DiffOp.Equal then the trailing lines can be dropped
     *     leaving the first 'lineContextSize' lines for context.
     *   > If the diff is a DiffOp.Equal occurs in the middle then the diffs either side of it must be
     *     DiffOp.Insert or DiffOp.Delete. If it has more than 2 * 'lineContextSize' lines of content
     *     then the middle lines are dropped leaving the first 'lineContextSize' and last 'lineContextSize'
     *     lines for context. A special line is inserted with '...' indicating that content is skipped.
     *
     * A document cannot consist of a single Diff with DiffOp.Equal and reach this function because
     * in this case the calculateLineDiff method returns early.
     */
    outputEqualDiff(diffLines, diffCalculation, isFirstDiff, isLastDiff) {
        if (this.lineContextSize && diffLines.length > this.lineContextSize) {
            if (isFirstDiff) {
                // Take the last 'lineContextSize' lines from the first diff
                const lineIncrement = diffLines.length - this.lineContextSize;
                diffCalculation.lineLeft += lineIncrement;
                diffCalculation.lineRight += lineIncrement;
                diffLines = diffLines.slice(diffLines.length - this.lineContextSize, diffLines.length);
            }
            else if (isLastDiff) {
                // Take only the first 'lineContextSize' lines from the final diff
                diffLines = diffLines.slice(0, this.lineContextSize);
            }
            else if (diffLines.length > 2 * this.lineContextSize) {
                // Take the first 'lineContextSize' lines from this diff to provide context for the last diff
                this.outputEqualDiffLines(diffLines.slice(0, this.lineContextSize), diffCalculation);
                // Output a special line indicating that some content is equal and has been skipped
                diffCalculation.lines.push(['dmp-line-compare-equal', '...', '...', '...']);
                const numberOfSkippedLines = diffLines.length - (2 * this.lineContextSize);
                diffCalculation.lineLeft += numberOfSkippedLines;
                diffCalculation.lineRight += numberOfSkippedLines;
                // Take the last 'lineContextSize' lines from this diff to provide context for the next diff
                this.outputEqualDiffLines(diffLines.slice(diffLines.length - this.lineContextSize), diffCalculation);
                // This if branch has already output the diff lines so we return early to avoid outputting the lines
                // at the end of the method.
                return;
            }
        }
        this.outputEqualDiffLines(diffLines, diffCalculation);
    }
    outputEqualDiffLines(diffLines, diffCalculation) {
        for (const line of diffLines) {
            diffCalculation.lines.push(['dmp-line-compare-equal', `${diffCalculation.lineLeft}`, `${diffCalculation.lineRight}`, line]);
            diffCalculation.lineLeft++;
            diffCalculation.lineRight++;
        }
    }
    outputDeleteDiff(diffLines, diffCalculation) {
        for (const line of diffLines) {
            diffCalculation.lines.push(['dmp-line-compare-delete', `${diffCalculation.lineLeft}`, '-', line]);
            diffCalculation.lineLeft++;
        }
    }
    outputInsertDiff(diffLines, diffCalculation) {
        for (const line of diffLines) {
            diffCalculation.lines.push(['dmp-line-compare-insert', '-', `${diffCalculation.lineRight}`, line]);
            diffCalculation.lineRight++;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LineCompareComponent, deps: [{ token: i1.DiffMatchPatchService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: LineCompareComponent, selector: "dmp-line-compare", inputs: { left: "left", right: "right", lineContextSize: "lineContextSize" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="dmp-line-compare-no-changes-text" *ngIf="isContentEqual">
      There are no changes to display.
    </div>    
    <div class="dmp-line-compare" *ngIf="!isContentEqual">
      <div class="dmp-line-compare-margin">
        <div [ngClass]="lineDiff[0]" *ngFor="let lineDiff of calculatedDiff">
          <div class="dmp-line-compare-left">{{lineDiff[1]}}</div><!-- No space
        --><div class="dmp-line-compare-right">{{lineDiff[2]}}</div>
        </div>
        <div class="dmp-margin-bottom-spacer"></div>
      </div><!-- No space
   --><div class="dmp-line-compare-content">
        <div class="dmp-line-compare-content-wrapper">
          <div [ngClass]="lineDiff[0]" *ngFor="let lineDiff of calculatedDiff">
            <div class="dmp-line-compare-text">{{lineDiff[3]}}</div>
          </div>
        </div>
      </div>
    </div>
  `, isInline: true, styles: ["div.dmp-line-compare{display:flex;flex-direction:row;border:1px solid #808080;font-family:Consolas,Courier,monospace;width:911px}div.dmp-line-compare-margin{width:101px}div.dmp-line-compare-content{position:relative;top:0;left:0;flex-grow:1;overflow-x:scroll}div.dmp-line-compare-content-wrapper{position:absolute;top:0;left:0;display:flex;flex-direction:column;align-items:stretch}div.dmp-line-compare-left{width:50px;text-align:center;color:#484848}div.dmp-line-compare-equal>div.dmp-line-compare-left,div.dmp-line-compare-equal>div.dmp-line-compare-right{background-color:#dedede}div.dmp-line-compare-insert>div.dmp-line-compare-left,div.dmp-line-compare-insert>div.dmp-line-compare-right{background-color:#8bfb6f}div.dmp-line-compare-delete>div.dmp-line-compare-left,div.dmp-line-compare-delete>div.dmp-line-compare-right{background-color:#f56868}div.dmp-line-compare-right{width:50px;text-align:center;color:#484848;border-right:1px solid #888888}div.dmp-line-compare-text{white-space:pre;padding-left:10px;min-width:800px}.dmp-line-compare-delete{background-color:#ff8c8c}.dmp-line-compare-insert{background-color:#9dff97}.dmp-line-compare-delete>div{display:inline-block}.dmp-line-compare-insert>div{display:inline-block}.dmp-line-compare-equal>div{display:inline-block}.dmp-margin-bottom-spacer{height:20px;background-color:#dedede;border-right:1px solid #888888}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: LineCompareComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dmp-line-compare', template: `
    <div class="dmp-line-compare-no-changes-text" *ngIf="isContentEqual">
      There are no changes to display.
    </div>    
    <div class="dmp-line-compare" *ngIf="!isContentEqual">
      <div class="dmp-line-compare-margin">
        <div [ngClass]="lineDiff[0]" *ngFor="let lineDiff of calculatedDiff">
          <div class="dmp-line-compare-left">{{lineDiff[1]}}</div><!-- No space
        --><div class="dmp-line-compare-right">{{lineDiff[2]}}</div>
        </div>
        <div class="dmp-margin-bottom-spacer"></div>
      </div><!-- No space
   --><div class="dmp-line-compare-content">
        <div class="dmp-line-compare-content-wrapper">
          <div [ngClass]="lineDiff[0]" *ngFor="let lineDiff of calculatedDiff">
            <div class="dmp-line-compare-text">{{lineDiff[3]}}</div>
          </div>
        </div>
      </div>
    </div>
  `, styles: ["div.dmp-line-compare{display:flex;flex-direction:row;border:1px solid #808080;font-family:Consolas,Courier,monospace;width:911px}div.dmp-line-compare-margin{width:101px}div.dmp-line-compare-content{position:relative;top:0;left:0;flex-grow:1;overflow-x:scroll}div.dmp-line-compare-content-wrapper{position:absolute;top:0;left:0;display:flex;flex-direction:column;align-items:stretch}div.dmp-line-compare-left{width:50px;text-align:center;color:#484848}div.dmp-line-compare-equal>div.dmp-line-compare-left,div.dmp-line-compare-equal>div.dmp-line-compare-right{background-color:#dedede}div.dmp-line-compare-insert>div.dmp-line-compare-left,div.dmp-line-compare-insert>div.dmp-line-compare-right{background-color:#8bfb6f}div.dmp-line-compare-delete>div.dmp-line-compare-left,div.dmp-line-compare-delete>div.dmp-line-compare-right{background-color:#f56868}div.dmp-line-compare-right{width:50px;text-align:center;color:#484848;border-right:1px solid #888888}div.dmp-line-compare-text{white-space:pre;padding-left:10px;min-width:800px}.dmp-line-compare-delete{background-color:#ff8c8c}.dmp-line-compare-insert{background-color:#9dff97}.dmp-line-compare-delete>div{display:inline-block}.dmp-line-compare-insert>div{display:inline-block}.dmp-line-compare-equal>div{display:inline-block}.dmp-margin-bottom-spacer{height:20px;background-color:#dedede;border-right:1px solid #888888}\n"] }]
        }], ctorParameters: () => [{ type: i1.DiffMatchPatchService }], propDecorators: { left: [{
                type: Input
            }], right: [{
                type: Input
            }], lineContextSize: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZUNvbXBhcmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZGlmZi1tYXRjaC1wYXRjaC9zcmMvbGliL2xpbmVDb21wYXJlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7Ozs7QUFrSHBFLE1BQU0sT0FBTyxvQkFBb0I7SUFhL0IsWUFDWSxHQUEwQjtRQUExQixRQUFHLEdBQUgsR0FBRyxDQUF1QjtRQVovQixTQUFJLEdBQThCLEVBQUUsQ0FBQztRQUVyQyxVQUFLLEdBQThCLEVBQUUsQ0FBQztJQVVKLENBQUM7SUFFbkMsUUFBUTtRQUNiLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sV0FBVztRQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLFVBQVU7UUFDaEIsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNwRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsQ0FBQztRQUNELElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDdEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN0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NUgsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzNCLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixDQUFDO0lBQ0gsQ0FBQztJQUVPLGdCQUFnQixDQUNwQixTQUFtQixFQUNuQixlQUFnQztRQUNsQyxLQUFLLE1BQU0sSUFBSSxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQzdCLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMseUJBQXlCLEVBQUUsR0FBRyxlQUFlLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEcsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDO0lBRU8sZ0JBQWdCLENBQ3BCLFNBQW1CLEVBQ25CLGVBQWdDO1FBQ2xDLEtBQUssTUFBTSxJQUFJLElBQUksU0FBUyxFQUFFLENBQUM7WUFDN0IsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUUsR0FBRyxlQUFlLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuRyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7K0dBM0pVLG9CQUFvQjttR0FBcEIsb0JBQW9CLDJKQXRCckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUOzs0RkFFVSxvQkFBb0I7a0JBbkdoQyxTQUFTOytCQUNFLGtCQUFrQixZQTRFbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUOzBGQUlNLElBQUk7c0JBRFYsS0FBSztnQkFHQyxLQUFLO3NCQURYLEtBQUs7Z0JBS0MsZUFBZTtzQkFEckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERpZmYsIERpZmZPcCB9IGZyb20gJy4vZGlmZk1hdGNoUGF0Y2gnO1xyXG5pbXBvcnQgeyBEaWZmTWF0Y2hQYXRjaFNlcnZpY2UgfSBmcm9tICcuL2RpZmZNYXRjaFBhdGNoLnNlcnZpY2UnO1xyXG5cclxuLyogSG9sZHMgdGhlIHN0YXRlIG9mIHRoZSBjYWxjdWxhdGlvbiBvZiB0aGUgZGlmZiByZXN1bHQgd2UgaW50ZW5kIHRvIGRpc3BsYXkuXHJcbiAqICA+IGxpbmVzIGNvbnRhaW5zIHRoZSBkYXRhIHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgb24gc2NyZWVuLlxyXG4gKiAgPiBsaW5lTGVmdCBrZWVwcyB0cmFjayBvZiB0aGUgZG9jdW1lbnQgbGluZSBudW1iZXIgaW4gdGhlIFtsZWZ0XSBpbnB1dC5cclxuICogID4gbGluZVJpZ2h0IGtlZXBzIHRyYWNrIG9mIHRoZSBkb2N1bWVudCBsaW5lIG51bWJlciBpbiB0aGUgW3JpZ2h0XSBpbnB1dC5cclxuICovXHJcbnR5cGUgRGlmZkNhbGN1bGF0aW9uID0ge1xyXG4gIGxpbmVzOiBBcnJheTxbc3RyaW5nLCBzdHJpbmcsIHN0cmluZywgc3RyaW5nXT4sXHJcbiAgbGluZUxlZnQ6IG51bWJlcixcclxuICBsaW5lUmlnaHQ6IG51bWJlclxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkbXAtbGluZS1jb21wYXJlJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICBkaXYuZG1wLWxpbmUtY29tcGFyZSB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICM4MDgwODA7XHJcbiAgICAgIGZvbnQtZmFtaWx5OiBDb25zb2xhcywgQ291cmllciwgbW9ub3NwYWNlO1xyXG4gICAgICB3aWR0aDogOTExcHg7XHJcbiAgICB9XHJcbiAgICBkaXYuZG1wLWxpbmUtY29tcGFyZS1tYXJnaW4ge1xyXG4gICAgICB3aWR0aDogMTAxcHg7XHJcbiAgICB9XHJcbiAgICBkaXYuZG1wLWxpbmUtY29tcGFyZS1jb250ZW50IHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICB0b3A6IDBweDtcclxuICAgICAgbGVmdDogMHB4O1xyXG4gICAgICBmbGV4LWdyb3c6IDE7XHJcbiAgICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcclxuICAgIH1cclxuICAgIGRpdi5kbXAtbGluZS1jb21wYXJlLWNvbnRlbnQtd3JhcHBlciB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgdG9wOiAwcHg7XHJcbiAgICAgIGxlZnQ6IDBweDtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XHJcbiAgICB9XHJcbiAgICBkaXYuZG1wLWxpbmUtY29tcGFyZS1sZWZ0IHtcclxuICAgICAgd2lkdGg6IDUwcHg7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgY29sb3I6ICM0ODQ4NDg7XHJcbiAgICB9XHJcbiAgICBkaXYuZG1wLWxpbmUtY29tcGFyZS1lcXVhbD5kaXYuZG1wLWxpbmUtY29tcGFyZS1sZWZ0LFxyXG4gICAgICBkaXYuZG1wLWxpbmUtY29tcGFyZS1lcXVhbD5kaXYuZG1wLWxpbmUtY29tcGFyZS1yaWdodCB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNkZWRlZGU7XHJcbiAgICB9XHJcbiAgICBkaXYuZG1wLWxpbmUtY29tcGFyZS1pbnNlcnQ+ZGl2LmRtcC1saW5lLWNvbXBhcmUtbGVmdCxcclxuICAgICAgZGl2LmRtcC1saW5lLWNvbXBhcmUtaW5zZXJ0PmRpdi5kbXAtbGluZS1jb21wYXJlLXJpZ2h0IHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzhiZmI2ZjtcclxuICAgIH1cclxuICAgIGRpdi5kbXAtbGluZS1jb21wYXJlLWRlbGV0ZT5kaXYuZG1wLWxpbmUtY29tcGFyZS1sZWZ0LFxyXG4gICAgICBkaXYuZG1wLWxpbmUtY29tcGFyZS1kZWxldGU+ZGl2LmRtcC1saW5lLWNvbXBhcmUtcmlnaHQge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjU2ODY4O1xyXG4gICAgfVxyXG4gICAgZGl2LmRtcC1saW5lLWNvbXBhcmUtcmlnaHQge1xyXG4gICAgICB3aWR0aDogNTBweDtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBjb2xvcjogIzQ4NDg0ODtcclxuICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzg4ODg4ODtcclxuICAgIH1cclxuICAgIGRpdi5kbXAtbGluZS1jb21wYXJlLXRleHQge1xyXG4gICAgICB3aGl0ZS1zcGFjZTogcHJlO1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbiAgICAgIG1pbi13aWR0aDogODAwcHg7XHJcbiAgICB9XHJcbiAgICAuZG1wLWxpbmUtY29tcGFyZS1kZWxldGUge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY4YzhjO1xyXG4gICAgfVxyXG4gICAgLmRtcC1saW5lLWNvbXBhcmUtaW5zZXJ0IHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzlkZmY5NztcclxuICAgIH1cclxuICAgIC5kbXAtbGluZS1jb21wYXJlLWRlbGV0ZT5kaXYge1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB9ICBcclxuICAgIC5kbXAtbGluZS1jb21wYXJlLWluc2VydD5kaXYge1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB9XHJcbiAgICAuZG1wLWxpbmUtY29tcGFyZS1lcXVhbD5kaXYge1xyXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICB9XHJcbiAgICAuZG1wLW1hcmdpbi1ib3R0b20tc3BhY2VyIHtcclxuICAgICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGVkZWRlO1xyXG4gICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjODg4ODg4O1xyXG4gICAgfVxyXG4gIGBdLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiZG1wLWxpbmUtY29tcGFyZS1uby1jaGFuZ2VzLXRleHRcIiAqbmdJZj1cImlzQ29udGVudEVxdWFsXCI+XHJcbiAgICAgIFRoZXJlIGFyZSBubyBjaGFuZ2VzIHRvIGRpc3BsYXkuXHJcbiAgICA8L2Rpdj4gICAgXHJcbiAgICA8ZGl2IGNsYXNzPVwiZG1wLWxpbmUtY29tcGFyZVwiICpuZ0lmPVwiIWlzQ29udGVudEVxdWFsXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJkbXAtbGluZS1jb21wYXJlLW1hcmdpblwiPlxyXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwibGluZURpZmZbMF1cIiAqbmdGb3I9XCJsZXQgbGluZURpZmYgb2YgY2FsY3VsYXRlZERpZmZcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkbXAtbGluZS1jb21wYXJlLWxlZnRcIj57e2xpbmVEaWZmWzFdfX08L2Rpdj48IS0tIE5vIHNwYWNlXHJcbiAgICAgICAgLS0+PGRpdiBjbGFzcz1cImRtcC1saW5lLWNvbXBhcmUtcmlnaHRcIj57e2xpbmVEaWZmWzJdfX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZG1wLW1hcmdpbi1ib3R0b20tc3BhY2VyXCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PjwhLS0gTm8gc3BhY2VcclxuICAgLS0+PGRpdiBjbGFzcz1cImRtcC1saW5lLWNvbXBhcmUtY29udGVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkbXAtbGluZS1jb21wYXJlLWNvbnRlbnQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJsaW5lRGlmZlswXVwiICpuZ0Zvcj1cImxldCBsaW5lRGlmZiBvZiBjYWxjdWxhdGVkRGlmZlwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZG1wLWxpbmUtY29tcGFyZS10ZXh0XCI+e3tsaW5lRGlmZlszXX19PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaW5lQ29tcGFyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBsZWZ0OiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuID0gJyc7XHJcbiAgQElucHV0KClcclxuICBwdWJsaWMgcmlnaHQ6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gPSAnJztcclxuICAvLyBUaGUgbnVtYmVyIG9mIGxpbmVzIG9mIGNvbnRleHQgdG8gcHJvdmlkZSBlaXRoZXIgc2lkZSBvZiBhIERpZmZPcC5JbnNlcnQgb3IgRGlmZk9wLkRlbGV0ZSBkaWZmLlxyXG4gIC8vIENvbnRleHQgaXMgdGFrZW4gZnJvbSBhIERpZmZPcC5FcXVhbCBzZWN0aW9uLlxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIGxpbmVDb250ZXh0U2l6ZTogbnVtYmVyO1xyXG5cclxuICBwdWJsaWMgY2FsY3VsYXRlZERpZmY6IEFycmF5PFtzdHJpbmcsIHN0cmluZywgc3RyaW5nLCBzdHJpbmddPjtcclxuICBwdWJsaWMgaXNDb250ZW50RXF1YWw6IGJvb2xlYW47XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBkbXA6IERpZmZNYXRjaFBhdGNoU2VydmljZSkge31cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGVIdG1sKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZUh0bWwoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlSHRtbCgpOiB2b2lkIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5sZWZ0ID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdGhpcy5sZWZ0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgdGhpcy5sZWZ0ID0gdGhpcy5sZWZ0LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHRoaXMucmlnaHQgPT09ICdudW1iZXInIHx8IHR5cGVvZiB0aGlzLnJpZ2h0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgdGhpcy5yaWdodCA9IHRoaXMucmlnaHQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2FsY3VsYXRlTGluZURpZmYodGhpcy5kbXAuZ2V0TGluZURpZmYodGhpcy5sZWZ0LCB0aGlzLnJpZ2h0KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNhbGN1bGF0ZUxpbmVEaWZmKGRpZmZzOiBBcnJheTxEaWZmPik6IHZvaWQge1xyXG4gICAgY29uc3QgZGlmZkNhbGN1bGF0aW9uOiBEaWZmQ2FsY3VsYXRpb24gPSB7XHJcbiAgICAgIGxpbmVzOiBbXSxcclxuICAgICAgbGluZUxlZnQ6IDEsXHJcbiAgICAgIGxpbmVSaWdodDogMVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmlzQ29udGVudEVxdWFsID0gZGlmZnMubGVuZ3RoID09PSAxICYmIGRpZmZzWzBdWzBdID09PSBEaWZmT3AuRXF1YWw7XHJcbiAgICBpZiAodGhpcy5pc0NvbnRlbnRFcXVhbCkge1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZWREaWZmID0gW107XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpZmZzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGRpZmYgPSBkaWZmc1tpXTtcclxuICAgICAgbGV0IGRpZmZMaW5lczogc3RyaW5nW10gPSBkaWZmWzFdLnNwbGl0KC9cXHI/XFxuLyk7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgb3JpZ2luYWwgbGluZSBoYWQgYSBcXHJcXG4gYXQgdGhlIGVuZCB0aGVuIHJlbW92ZSB0aGVcclxuICAgICAgLy8gZW1wdHkgc3RyaW5nIGFmdGVyIGl0LlxyXG4gICAgICBpZiAoZGlmZkxpbmVzW2RpZmZMaW5lcy5sZW5ndGggLSAxXS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgIGRpZmZMaW5lcy5wb3AoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3dpdGNoIChkaWZmWzBdKSB7XHJcbiAgICAgICAgY2FzZSBEaWZmT3AuRXF1YWw6IHtcclxuICAgICAgICAgIGNvbnN0IGlzRmlyc3REaWZmID0gaSA9PT0gMDtcclxuICAgICAgICAgIGNvbnN0IGlzTGFzdERpZmYgPSBpID09PSBkaWZmcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgdGhpcy5vdXRwdXRFcXVhbERpZmYoZGlmZkxpbmVzLCBkaWZmQ2FsY3VsYXRpb24sIGlzRmlyc3REaWZmLCBpc0xhc3REaWZmKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIERpZmZPcC5EZWxldGU6IHtcclxuICAgICAgICAgIHRoaXMub3V0cHV0RGVsZXRlRGlmZihkaWZmTGluZXMsIGRpZmZDYWxjdWxhdGlvbik7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBEaWZmT3AuSW5zZXJ0OiB7XHJcbiAgICAgICAgICB0aGlzLm91dHB1dEluc2VydERpZmYoZGlmZkxpbmVzLCBkaWZmQ2FsY3VsYXRpb24pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYWxjdWxhdGVkRGlmZiA9IGRpZmZDYWxjdWxhdGlvbi5saW5lcztcclxuICB9XHJcblxyXG4gIC8qIElmIHRoZSBudW1iZXIgb2YgZGlmZkxpbmVzIGlzIGdyZWF0ZXIgdGhhbiBsaW5lQ29udGV4dFNpemUgdGhlbiB3ZSBtYXkgbmVlZCB0byBhZGp1c3QgdGhlIGRpZmZcclxuICAgKiB0aGF0IGlzIG91dHB1dC5cclxuICAgKiAgID4gSWYgdGhlIGZpcnN0IGRpZmYgb2YgYSBkb2N1bWVudCBpcyBEaWZmT3AuRXF1YWwgdGhlbiB0aGUgbGVhZGluZyBsaW5lcyBjYW4gYmUgZHJvcHBlZFxyXG4gICAqICAgICBsZWF2aW5nIHRoZSBsYXN0ICdsaW5lQ29udGV4dFNpemUnIGxpbmVzIGZvciBjb250ZXh0LlxyXG4gICAqICAgPiBJZiB0aGUgbGFzdCBkaWZmIG9mIGEgZG9jdW1lbnQgaXMgRGlmZk9wLkVxdWFsIHRoZW4gdGhlIHRyYWlsaW5nIGxpbmVzIGNhbiBiZSBkcm9wcGVkXHJcbiAgICogICAgIGxlYXZpbmcgdGhlIGZpcnN0ICdsaW5lQ29udGV4dFNpemUnIGxpbmVzIGZvciBjb250ZXh0LlxyXG4gICAqICAgPiBJZiB0aGUgZGlmZiBpcyBhIERpZmZPcC5FcXVhbCBvY2N1cnMgaW4gdGhlIG1pZGRsZSB0aGVuIHRoZSBkaWZmcyBlaXRoZXIgc2lkZSBvZiBpdCBtdXN0IGJlXHJcbiAgICogICAgIERpZmZPcC5JbnNlcnQgb3IgRGlmZk9wLkRlbGV0ZS4gSWYgaXQgaGFzIG1vcmUgdGhhbiAyICogJ2xpbmVDb250ZXh0U2l6ZScgbGluZXMgb2YgY29udGVudFxyXG4gICAqICAgICB0aGVuIHRoZSBtaWRkbGUgbGluZXMgYXJlIGRyb3BwZWQgbGVhdmluZyB0aGUgZmlyc3QgJ2xpbmVDb250ZXh0U2l6ZScgYW5kIGxhc3QgJ2xpbmVDb250ZXh0U2l6ZSdcclxuICAgKiAgICAgbGluZXMgZm9yIGNvbnRleHQuIEEgc3BlY2lhbCBsaW5lIGlzIGluc2VydGVkIHdpdGggJy4uLicgaW5kaWNhdGluZyB0aGF0IGNvbnRlbnQgaXMgc2tpcHBlZC5cclxuICAgKlxyXG4gICAqIEEgZG9jdW1lbnQgY2Fubm90IGNvbnNpc3Qgb2YgYSBzaW5nbGUgRGlmZiB3aXRoIERpZmZPcC5FcXVhbCBhbmQgcmVhY2ggdGhpcyBmdW5jdGlvbiBiZWNhdXNlXHJcbiAgICogaW4gdGhpcyBjYXNlIHRoZSBjYWxjdWxhdGVMaW5lRGlmZiBtZXRob2QgcmV0dXJucyBlYXJseS5cclxuICAgKi9cclxuICBwcml2YXRlIG91dHB1dEVxdWFsRGlmZihcclxuICAgICAgZGlmZkxpbmVzOiBzdHJpbmdbXSxcclxuICAgICAgZGlmZkNhbGN1bGF0aW9uOiBEaWZmQ2FsY3VsYXRpb24sXHJcbiAgICAgIGlzRmlyc3REaWZmOiBib29sZWFuLFxyXG4gICAgICBpc0xhc3REaWZmOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5saW5lQ29udGV4dFNpemUgJiYgZGlmZkxpbmVzLmxlbmd0aCA+IHRoaXMubGluZUNvbnRleHRTaXplKSB7XHJcbiAgICAgIGlmIChpc0ZpcnN0RGlmZikge1xyXG4gICAgICAgIC8vIFRha2UgdGhlIGxhc3QgJ2xpbmVDb250ZXh0U2l6ZScgbGluZXMgZnJvbSB0aGUgZmlyc3QgZGlmZlxyXG4gICAgICAgIGNvbnN0IGxpbmVJbmNyZW1lbnQgPSBkaWZmTGluZXMubGVuZ3RoIC0gdGhpcy5saW5lQ29udGV4dFNpemU7XHJcbiAgICAgICAgZGlmZkNhbGN1bGF0aW9uLmxpbmVMZWZ0ICs9IGxpbmVJbmNyZW1lbnQ7XHJcbiAgICAgICAgZGlmZkNhbGN1bGF0aW9uLmxpbmVSaWdodCArPSBsaW5lSW5jcmVtZW50O1xyXG4gICAgICAgIGRpZmZMaW5lcyA9IGRpZmZMaW5lcy5zbGljZShkaWZmTGluZXMubGVuZ3RoIC0gdGhpcy5saW5lQ29udGV4dFNpemUsIGRpZmZMaW5lcy5sZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGlzTGFzdERpZmYpIHtcclxuICAgICAgICAvLyBUYWtlIG9ubHkgdGhlIGZpcnN0ICdsaW5lQ29udGV4dFNpemUnIGxpbmVzIGZyb20gdGhlIGZpbmFsIGRpZmZcclxuICAgICAgICBkaWZmTGluZXMgPSBkaWZmTGluZXMuc2xpY2UoMCwgdGhpcy5saW5lQ29udGV4dFNpemUpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGRpZmZMaW5lcy5sZW5ndGggPiAyICogdGhpcy5saW5lQ29udGV4dFNpemUpIHtcclxuICAgICAgICAvLyBUYWtlIHRoZSBmaXJzdCAnbGluZUNvbnRleHRTaXplJyBsaW5lcyBmcm9tIHRoaXMgZGlmZiB0byBwcm92aWRlIGNvbnRleHQgZm9yIHRoZSBsYXN0IGRpZmZcclxuICAgICAgICB0aGlzLm91dHB1dEVxdWFsRGlmZkxpbmVzKGRpZmZMaW5lcy5zbGljZSgwLCB0aGlzLmxpbmVDb250ZXh0U2l6ZSksIGRpZmZDYWxjdWxhdGlvbik7XHJcblxyXG4gICAgICAgIC8vIE91dHB1dCBhIHNwZWNpYWwgbGluZSBpbmRpY2F0aW5nIHRoYXQgc29tZSBjb250ZW50IGlzIGVxdWFsIGFuZCBoYXMgYmVlbiBza2lwcGVkXHJcbiAgICAgICAgZGlmZkNhbGN1bGF0aW9uLmxpbmVzLnB1c2goWydkbXAtbGluZS1jb21wYXJlLWVxdWFsJywgJy4uLicsICcuLi4nLCAnLi4uJ10pO1xyXG4gICAgICAgIGNvbnN0IG51bWJlck9mU2tpcHBlZExpbmVzID0gZGlmZkxpbmVzLmxlbmd0aCAtICgyICogdGhpcy5saW5lQ29udGV4dFNpemUpO1xyXG4gICAgICAgIGRpZmZDYWxjdWxhdGlvbi5saW5lTGVmdCArPSBudW1iZXJPZlNraXBwZWRMaW5lcztcclxuICAgICAgICBkaWZmQ2FsY3VsYXRpb24ubGluZVJpZ2h0ICs9IG51bWJlck9mU2tpcHBlZExpbmVzO1xyXG5cclxuICAgICAgICAvLyBUYWtlIHRoZSBsYXN0ICdsaW5lQ29udGV4dFNpemUnIGxpbmVzIGZyb20gdGhpcyBkaWZmIHRvIHByb3ZpZGUgY29udGV4dCBmb3IgdGhlIG5leHQgZGlmZlxyXG4gICAgICAgIHRoaXMub3V0cHV0RXF1YWxEaWZmTGluZXMoZGlmZkxpbmVzLnNsaWNlKGRpZmZMaW5lcy5sZW5ndGggLSB0aGlzLmxpbmVDb250ZXh0U2l6ZSksIGRpZmZDYWxjdWxhdGlvbik7XHJcbiAgICAgICAgLy8gVGhpcyBpZiBicmFuY2ggaGFzIGFscmVhZHkgb3V0cHV0IHRoZSBkaWZmIGxpbmVzIHNvIHdlIHJldHVybiBlYXJseSB0byBhdm9pZCBvdXRwdXR0aW5nIHRoZSBsaW5lc1xyXG4gICAgICAgIC8vIGF0IHRoZSBlbmQgb2YgdGhlIG1ldGhvZC5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMub3V0cHV0RXF1YWxEaWZmTGluZXMoZGlmZkxpbmVzLCBkaWZmQ2FsY3VsYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvdXRwdXRFcXVhbERpZmZMaW5lcyhcclxuICAgICAgZGlmZkxpbmVzOiBzdHJpbmdbXSxcclxuICAgICAgZGlmZkNhbGN1bGF0aW9uOiBEaWZmQ2FsY3VsYXRpb24pOiB2b2lkIHtcclxuICAgIGZvciAoY29uc3QgbGluZSBvZiBkaWZmTGluZXMpIHtcclxuICAgICAgZGlmZkNhbGN1bGF0aW9uLmxpbmVzLnB1c2goWydkbXAtbGluZS1jb21wYXJlLWVxdWFsJywgYCR7ZGlmZkNhbGN1bGF0aW9uLmxpbmVMZWZ0fWAsIGAke2RpZmZDYWxjdWxhdGlvbi5saW5lUmlnaHR9YCwgbGluZV0pO1xyXG4gICAgICBkaWZmQ2FsY3VsYXRpb24ubGluZUxlZnQrKztcclxuICAgICAgZGlmZkNhbGN1bGF0aW9uLmxpbmVSaWdodCsrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvdXRwdXREZWxldGVEaWZmKFxyXG4gICAgICBkaWZmTGluZXM6IHN0cmluZ1tdLFxyXG4gICAgICBkaWZmQ2FsY3VsYXRpb246IERpZmZDYWxjdWxhdGlvbik6IHZvaWQge1xyXG4gICAgZm9yIChjb25zdCBsaW5lIG9mIGRpZmZMaW5lcykge1xyXG4gICAgICBkaWZmQ2FsY3VsYXRpb24ubGluZXMucHVzaChbJ2RtcC1saW5lLWNvbXBhcmUtZGVsZXRlJywgYCR7ZGlmZkNhbGN1bGF0aW9uLmxpbmVMZWZ0fWAsICctJywgbGluZV0pO1xyXG4gICAgICBkaWZmQ2FsY3VsYXRpb24ubGluZUxlZnQrKztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb3V0cHV0SW5zZXJ0RGlmZihcclxuICAgICAgZGlmZkxpbmVzOiBzdHJpbmdbXSxcclxuICAgICAgZGlmZkNhbGN1bGF0aW9uOiBEaWZmQ2FsY3VsYXRpb24pOiB2b2lkIHtcclxuICAgIGZvciAoY29uc3QgbGluZSBvZiBkaWZmTGluZXMpIHtcclxuICAgICAgZGlmZkNhbGN1bGF0aW9uLmxpbmVzLnB1c2goWydkbXAtbGluZS1jb21wYXJlLWluc2VydCcsICctJywgYCR7ZGlmZkNhbGN1bGF0aW9uLmxpbmVSaWdodH1gLCBsaW5lXSk7XHJcbiAgICAgIGRpZmZDYWxjdWxhdGlvbi5saW5lUmlnaHQrKztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19