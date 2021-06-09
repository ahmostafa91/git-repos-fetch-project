export default class MainApi {

    static mainApi(relativePath, crudType) {
        return fetch(this.BASE_URL + relativePath, crudType);
    }
}

MainApi.BASE_URL = 'https://api.github.com/search/repositories'