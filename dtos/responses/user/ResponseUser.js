class ResponseUser {
    constructor (data) {
        this.id = data.id
        this.email = data.email
        this.name = data.name
        this.role = data.role
        this.avatar = data.avatar
        this.phone = data.phone
    }
}
 export default ResponseUser