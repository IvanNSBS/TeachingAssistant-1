import request = require("request-promise");

type ExpectBody = (body: any) => any;
type After = () => Promise<Request>;

function getRequest(url: string, xpect: ExpectBody, aft?: After) 
{
    return request.get(url)
        .then(body => {
            xpect(body);

            if(aft !== undefined)
                return aft();
        })
}

function postRequest(url: string, options: any, xpect: ExpectBody, aft?: After){
    return request.post(url, options)
        .then(body => {
            xpect(body);

            if(aft !== undefined)
                return aft();
    })
}

function deleteRequest(url: string, xpect: ExpectBody, aft?: After){
    return request.delete(url)
        .then(body => {
            xpect(body);

            if(aft !== undefined)
                return aft();
        })
}
export { getRequest, postRequest, deleteRequest };