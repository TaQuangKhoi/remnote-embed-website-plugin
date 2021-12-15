import RemNoteAPI from 'remnote-api';
import * as RemNoteUtil from 'remnote-api/util';

window.rapi = RemNoteAPI.v0;
window.rutil = RemNoteUtil;

export async function loadDomain(domain) {
    console.log('name', await RemNoteAPI.v0.get_by_name('Schedule', { parentId: documentRem._id }));
    let children = await RemNoteUtil.getChildren(documentRem, true);
    await RemNoteUtil.loadText(children);
return domain;
}