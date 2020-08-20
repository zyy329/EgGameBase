/**
 * 自定义弹窗对象基类;
 */
class VPop extends eui.Component {
    // 弹窗类名字;
    private _name: string;

    public constructor() {
        super();
        this._name = egret.getQualifiedClassName(this);
    }

    // 创建事件;
    protected childrenCreated() {
        super.childrenCreated();
        //当前高宽 等于舞台高宽
        this.percentWidth = 100;
        this.percentHeight = 100;
    }

    // 释放事件;
    protected Release() { };


    // 关闭弹窗;
    public close(): void {
        this.Release();
    }

    // 关联蒙版点击响应事件;
    public onClickMask(): void {
        this.close();
    }

    public get Name(): string {
        return this._name;
    }
}
