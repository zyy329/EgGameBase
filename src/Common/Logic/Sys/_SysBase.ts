/**
 * SysLogic 基类;
 * 确保只有 SysLogic 可以访问到 Data 数据;
 */
class SysBase {
    protected static dt: DataPool = new DataPool();
}