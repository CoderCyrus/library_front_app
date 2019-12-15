import { AbstractTreeNode } from './abstractTreeNode.model';
import { Systemtree } from './systemtree.model';
import { Metric } from './metric.model';

/**
 * A class to retrieve the two types of data that are sent by the backend.
 * The data can then be converted to a single list of type AbstractDataModel that
 * can be passed to d3js.
 */
export class HttpData {

    listSystems: Systemtree[];
    listMetrics: Metric[];

    /**
     * The data from http.get is not retrieved in a HttpData object so this method is static to be used
     * on the object from http.get.
     * @param listSystems 
     * @param listMetrics 
     */
    static toSingleList(listSystems: Systemtree[], listMetrics: Metric[]): AbstractTreeNode[] {
        return listSystems.map(sys => <AbstractTreeNode>(new Systemtree(sys)))
                .concat(listMetrics.map(metric => <AbstractTreeNode>(new Metric(metric))))
    }

}