export abstract class AbstractTreeNode {

    public id_node: number;
    public id_parent: number;
    public name: string;
    public state: number;
    public nbIssues: number; // number of issues in the subsystems (state != 2)

    constructor(id_node: number, id_parent: number, name: string, state: number) {
        this.id_node = id_node;
        this.id_parent = id_parent;
        this.name = name;
        this.state = state;
        this.nbIssues = 0
    }
}