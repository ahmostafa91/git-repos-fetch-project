import MainApi from './index';

export default class GetData extends MainApi {

    static getData(pageNum) {
        return super.mainApi(`?q=created:>2020-12-31&sort=stars&order=desc&page=${pageNum}`).then(res => res.json())
    }
}