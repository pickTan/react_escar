/**
 * Created by girl on 16/5/25.
 */
import core from './core.js';

const Post = (obj,date={}) => {
    core(obj,{date:date});
}

module.exports =  Post;
