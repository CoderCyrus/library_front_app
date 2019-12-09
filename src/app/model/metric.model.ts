import { Timestamp } from 'rxjs';

export class Metric{
    name: string;
    value: number;
    last_checked: Timestamp<string>;
    threshMin: number;
    threshMax: number;
    res1: number;
    res2: number;
}