/**
 * SysLogic 访问池, 可以通过该类 访问到所有 SysLogic 对象;
 * 全局可见; (成员全为 static 静态对象)
 */
class SysPool {
    public static init: SysInit = new SysInit();
}
