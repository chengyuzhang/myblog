import request from 'superagent';
export const LOADING='LOADING';

export function initPage(content){
    return {
        type:LOADING,
        content
    }
}

export function getData(data){
    var postData = {};

    return (dispatch)=>{

        return new Promise((resolve)=>{
            request.get('http://localhost:3001/')
            .query({page:2})
            .end((err, res)=>{
                if (err || !res.ok) {
                    console.log('Oh no! error：',err);
                } else {
                    var body = JSON.parse(res.text);
                    //console.log(body);
                    dispatch(initPage(body));
                    resolve(body);
                }
            });
        });
    }
}
