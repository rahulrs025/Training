class ItemService {
    constructor() {
      this.items = [
        { name : 'John', mobile: '9876543210', department: 'Tech', designation: 'Developer', attendance: 90, dob:'2000-01-02'},
        { name : 'Marry', mobile: '1234567890', department: 'QA', designation: 'Test Engineer', attendance: 95, dob:'1995-04-03'},
        { name : 'Asif', mobile: '979879797', department: 'HR', designation: 'HR Dept', attendance: 89, dob:'1990-12-02'}
      ];
    }
    async retrieveItems() {
        return Promise.resolve(this.items);
    }

    async filterItems(requestData) {

      let result = [];
      for(let item of this.items) {
        if(item.name.indexOf(requestData.name) > -1 || item.department.indexOf(requestData.dept) > -1) {
          result.push(item);
        }
      }
      return Promise.resolve(result);
    }
}
export default ItemService;