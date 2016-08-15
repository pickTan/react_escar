/**
 * Created by girl on 16/8/11.
 */
export  default function (props){
    let funs = {};
    for(let key in props){
        (/Fun$/.test(key)) && (funs[key] = props[key]);
    }
    return funs;
}
