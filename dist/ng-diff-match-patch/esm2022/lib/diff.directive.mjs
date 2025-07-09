import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./diffMatchPatch.service";
export class DiffDirective {
    constructor(el, dmp) {
        this.el = el;
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
        this.el.nativeElement.innerHTML = this.createHtml(this.dmp.getDiff(this.left, this.right));
    }
    createHtml(diffs) {
        let html;
        html = '<div>';
        for (let diff of diffs) {
            diff[1] = diff[1].replace(/\n/g, '<br/>');
            if (diff[0] === 0 /* DiffOp.Equal */) {
                html += '<span class="equal">' + diff[1] + '</span>';
            }
            if (diff[0] === -1 /* DiffOp.Delete */) {
                html += '<del>' + diff[1] + '</del>';
            }
            if (diff[0] === 1 /* DiffOp.Insert */) {
                html += '<ins>' + diff[1] + '</ins>';
            }
        }
        html += '</div>';
        return html;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: DiffDirective, deps: [{ token: i0.ElementRef }, { token: i1.DiffMatchPatchService }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.13", type: DiffDirective, selector: "[diff]", inputs: { left: "left", right: "right" }, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: DiffDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[diff]'
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.DiffMatchPatchService }], propDecorators: { left: [{
                type: Input
            }], right: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1kaWZmLW1hdGNoLXBhdGNoL3NyYy9saWIvZGlmZi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDOzs7QUFPaEYsTUFBTSxPQUFPLGFBQWE7SUFLeEIsWUFDVSxFQUFjLEVBQ2QsR0FBMEI7UUFEMUIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLFFBQUcsR0FBSCxHQUFHLENBQXVCO1FBTDNCLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsVUFBSyxHQUFXLEVBQUUsQ0FBQztJQUlhLENBQUM7SUFFbkMsUUFBUTtRQUNiLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sV0FBVztRQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLFVBQVU7UUFDaEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQy9DLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVPLFVBQVUsQ0FBQyxLQUFrQjtRQUNuQyxJQUFJLElBQVksQ0FBQztRQUNqQixJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ2YsS0FBSSxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFMUMsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLHlCQUFpQixFQUFFLENBQUM7Z0JBQzVCLElBQUksSUFBSSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBQ3ZELENBQUM7WUFDRCxJQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsMkJBQWtCLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ3ZDLENBQUM7WUFDRCxJQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsMEJBQWtCLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ3ZDLENBQUM7UUFDSCxDQUFDO1FBQ0QsSUFBSSxJQUFJLFFBQVEsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7K0dBeENVLGFBQWE7bUdBQWIsYUFBYTs7NEZBQWIsYUFBYTtrQkFIekIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsUUFBUTtpQkFDbkI7bUhBR1UsSUFBSTtzQkFBWixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERpZmZNYXRjaFBhdGNoU2VydmljZSB9IGZyb20gJy4vZGlmZk1hdGNoUGF0Y2guc2VydmljZSc7XHJcbmltcG9ydCB7IERpZmYsIERpZmZPcCB9IGZyb20gJy4vZGlmZk1hdGNoUGF0Y2gnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbZGlmZl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaWZmRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG5cclxuICBASW5wdXQoKSBsZWZ0OiBzdHJpbmcgPSAnJztcclxuICBASW5wdXQoKSByaWdodDogc3RyaW5nID0gJyc7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIGRtcDogRGlmZk1hdGNoUGF0Y2hTZXJ2aWNlKSB7ICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMudXBkYXRlSHRtbCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGVIdG1sKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUh0bWwoKTogdm9pZCB7XHJcbiAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5jcmVhdGVIdG1sKFxyXG4gICAgICB0aGlzLmRtcC5nZXREaWZmKHRoaXMubGVmdCwgdGhpcy5yaWdodCkpO1xyXG4gIH1cclxuICBcclxuICBwcml2YXRlIGNyZWF0ZUh0bWwoZGlmZnM6IEFycmF5PERpZmY+KTogc3RyaW5nIHtcclxuICAgIGxldCBodG1sOiBzdHJpbmc7XHJcbiAgICBodG1sID0gJzxkaXY+JztcclxuICAgIGZvcihsZXQgZGlmZiBvZiBkaWZmcykge1xyXG4gICAgICBkaWZmWzFdID0gZGlmZlsxXS5yZXBsYWNlKC9cXG4vZywgJzxici8+Jyk7XHJcblxyXG4gICAgICBpZihkaWZmWzBdID09PSBEaWZmT3AuRXF1YWwpIHtcclxuICAgICAgICBodG1sICs9ICc8c3BhbiBjbGFzcz1cImVxdWFsXCI+JyArIGRpZmZbMV0gKyAnPC9zcGFuPic7XHJcbiAgICAgIH1cclxuICAgICAgaWYoZGlmZlswXSA9PT0gRGlmZk9wLkRlbGV0ZSkge1xyXG4gICAgICAgIGh0bWwgKz0gJzxkZWw+JyArIGRpZmZbMV0gKyAnPC9kZWw+JztcclxuICAgICAgfVxyXG4gICAgICBpZihkaWZmWzBdID09PSBEaWZmT3AuSW5zZXJ0KSB7XHJcbiAgICAgICAgaHRtbCArPSAnPGlucz4nICsgZGlmZlsxXSArICc8L2lucz4nO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBodG1sICs9ICc8L2Rpdj4nO1xyXG4gICAgcmV0dXJuIGh0bWw7XHJcbiAgfVxyXG59XHJcbiJdfQ==