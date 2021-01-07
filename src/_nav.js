const items = [
    {}
];

let itemsExport = [];

_.forEach(items, (item) => {
    if (item.attributes !== undefined && !item.attributes.hidden && verifyChildrens(item))
        itemsExport.push(item);
})

function verifyChildrens(item) {

    let hijos = [];

    _.forEach(item.children, (children) => {
        if (children.attributes.hidden === false) {
            hijos.push(children)
        }
    })

    return hijos.length > 0 //Si tiene al menos que no está oculto muestralo
}

export default {
    items: itemsExport
}
