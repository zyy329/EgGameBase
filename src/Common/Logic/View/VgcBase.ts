/**
 * ViewLogic 基类;
 * 确保只有 ViewLogic 可以访问到 View;
 */
class VgcBase {
    protected static vi: ViewMgr = new ViewMgr();
}