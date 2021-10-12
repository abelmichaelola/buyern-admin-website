class ListDataManager {
  setListGetter = (listGetter: Function): ListDataManager => {
    this.getList = listGetter;
    return this;
  };
  getList!: Function;
  update?: Function;
}
export { ListDataManager };
