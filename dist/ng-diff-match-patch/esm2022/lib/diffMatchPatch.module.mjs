import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiffDirective } from './diff.directive';
import { LineDiffDirective } from './lineDiff.directive';
import { ProcessingDiffDirective } from './processingDiff.directive';
import { SemanticDiffDirective } from './semanticDiff.directive';
import { LineCompareComponent } from './lineCompare.component';
import * as i0 from "@angular/core";
export class DiffMatchPatchModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: DiffMatchPatchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.13", ngImport: i0, type: DiffMatchPatchModule, declarations: [DiffDirective,
            LineDiffDirective,
            ProcessingDiffDirective,
            SemanticDiffDirective,
            LineCompareComponent], imports: [CommonModule], exports: [DiffDirective,
            LineDiffDirective,
            ProcessingDiffDirective,
            SemanticDiffDirective,
            LineCompareComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: DiffMatchPatchModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: DiffMatchPatchModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        DiffDirective,
                        LineDiffDirective,
                        ProcessingDiffDirective,
                        SemanticDiffDirective,
                        LineCompareComponent
                    ],
                    imports: [
                        CommonModule
                    ],
                    exports: [
                        DiffDirective,
                        LineDiffDirective,
                        ProcessingDiffDirective,
                        SemanticDiffDirective,
                        LineCompareComponent
                    ],
                    providers: [
                    // DiffMatchPatch
                    // DiffMatchPatchService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZk1hdGNoUGF0Y2gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZGlmZi1tYXRjaC1wYXRjaC9zcmMvbGliL2RpZmZNYXRjaFBhdGNoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBNEIvRCxNQUFNLE9BQU8sb0JBQW9COytHQUFwQixvQkFBb0I7Z0hBQXBCLG9CQUFvQixpQkFyQjdCLGFBQWE7WUFDYixpQkFBaUI7WUFDakIsdUJBQXVCO1lBQ3ZCLHFCQUFxQjtZQUNyQixvQkFBb0IsYUFHcEIsWUFBWSxhQUdaLGFBQWE7WUFDYixpQkFBaUI7WUFDakIsdUJBQXVCO1lBQ3ZCLHFCQUFxQjtZQUNyQixvQkFBb0I7Z0hBT1gsb0JBQW9CLFlBZDdCLFlBQVk7OzRGQWNILG9CQUFvQjtrQkF2QmhDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGFBQWE7d0JBQ2IsaUJBQWlCO3dCQUNqQix1QkFBdUI7d0JBQ3ZCLHFCQUFxQjt3QkFDckIsb0JBQW9CO3FCQUNyQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsYUFBYTt3QkFDYixpQkFBaUI7d0JBQ2pCLHVCQUF1Qjt3QkFDdkIscUJBQXFCO3dCQUNyQixvQkFBb0I7cUJBQ3JCO29CQUNELFNBQVMsRUFBRTtvQkFDVCxpQkFBaUI7b0JBQ2pCLHdCQUF3QjtxQkFDekI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBEaWZmRGlyZWN0aXZlIH0gZnJvbSAnLi9kaWZmLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IExpbmVEaWZmRGlyZWN0aXZlIH0gZnJvbSAnLi9saW5lRGlmZi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBQcm9jZXNzaW5nRGlmZkRpcmVjdGl2ZSB9IGZyb20gJy4vcHJvY2Vzc2luZ0RpZmYuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgU2VtYW50aWNEaWZmRGlyZWN0aXZlIH0gZnJvbSAnLi9zZW1hbnRpY0RpZmYuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTGluZUNvbXBhcmVDb21wb25lbnQgfSBmcm9tICcuL2xpbmVDb21wYXJlLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBEaWZmTWF0Y2hQYXRjaCB9IGZyb20gJy4vZGlmZk1hdGNoUGF0Y2gnO1xyXG5pbXBvcnQgeyBEaWZmTWF0Y2hQYXRjaFNlcnZpY2UgfSBmcm9tICcuL2RpZmZNYXRjaFBhdGNoLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIERpZmZEaXJlY3RpdmUsXHJcbiAgICBMaW5lRGlmZkRpcmVjdGl2ZSxcclxuICAgIFByb2Nlc3NpbmdEaWZmRGlyZWN0aXZlLFxyXG4gICAgU2VtYW50aWNEaWZmRGlyZWN0aXZlLFxyXG4gICAgTGluZUNvbXBhcmVDb21wb25lbnRcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgRGlmZkRpcmVjdGl2ZSxcclxuICAgIExpbmVEaWZmRGlyZWN0aXZlLFxyXG4gICAgUHJvY2Vzc2luZ0RpZmZEaXJlY3RpdmUsXHJcbiAgICBTZW1hbnRpY0RpZmZEaXJlY3RpdmUsXHJcbiAgICBMaW5lQ29tcGFyZUNvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICAvLyBEaWZmTWF0Y2hQYXRjaFxyXG4gICAgLy8gRGlmZk1hdGNoUGF0Y2hTZXJ2aWNlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGlmZk1hdGNoUGF0Y2hNb2R1bGUgeyB9XHJcbiJdfQ==