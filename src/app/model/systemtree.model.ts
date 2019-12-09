import { Metric } from './metric.model';
import { StaticInfo } from './staticInfo.model';
export class Systemtree {

    id_node : number;
    id_parent : number;
    system_name: string;
    instance_name: string;
    has_static: boolean;
    has_metrics: boolean;
    listStaticInfo: Array<StaticInfo>;
    listMetrics: Array<Metric>;
    value: number;

}