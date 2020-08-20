/**
 * 数据访问池, 可以通过该类 访问到所有数据对象;
 * 可以通过对该类的可见性, 限制 Data 数据的可见性;
 */
class DataPool {
    public login: DtLogin = new DtLogin();
}
