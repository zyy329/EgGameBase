/**
 * ViewLogic 访问池, 可以通过该类 访问到所有 ViewLogic 对象;
 * 全局可见; (成员全为 static 静态对象)
 * Vgc = View Logic
 */
class VgcPool {
    public static init: VgcInit = new VgcInit();
    public static load: ResLoader = new ResLoader();
    public static start: VgcStart = new VgcStart();
}
