import request = require("request-promise");

type ExpectBody = (body: any) => any;
type After = () => Promise<Request>;

interface URLS {
    readonly base_url: string;
    readonly roteiroUrl: string;
    readonly lixeiraUrl: string;
}

interface TestsMessages {
    readonly createRotSuccess: object;
    readonly deleteRotSuccess: string;
    readonly permaDelSuccess: string;
    readonly restoreSuccess: object;
}

const urls: URLS = {
    base_url:   "http://localhost:3000/",
    roteiroUrl: "http://localhost:3000/roteiro/",
    lixeiraUrl: "http://localhost:3000/roteiro/lixeira/"
}

const messages: TestsMessages = {
    createRotSuccess:   {success: "O roteiro foi cadastrado com sucesso"},
    deleteRotSuccess:   '{"success":"O roteiro foi enviado para a lixeira"}',
    permaDelSuccess :   '{"success":"Os roteiros foram deletados permanentemente"}',
    restoreSuccess:     {success:"Os roteiros foram restaurados com sucesso"}
}

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
export { getRequest, postRequest, deleteRequest, urls, messages };