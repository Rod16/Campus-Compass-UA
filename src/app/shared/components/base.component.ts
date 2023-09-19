import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export abstract class BaseComponent implements OnDestroy {
  public unsubscribeOnComponentDestroy$: Subject<void> = new Subject();
  public unsubscribeOnComponentDestroyTakeUntil$ = takeUntil(this.unsubscribeOnComponentDestroy$);

  protected unsubscribeOnComponentDestroy<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(this.unsubscribeOnComponentDestroyTakeUntil$) as Observable<T>;
  }

  ngOnDestroy() {
    this.unsubscribeOnComponentDestroy$.next();
    this.unsubscribeOnComponentDestroy$.complete();
  }
}
