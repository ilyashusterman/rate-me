// function queryValues(values, name, value) {
//     return values.filter((d) => parseInt(d[name]) === value)
//   }
//   var id = '1PKxpfZtwN1lYUnbH6RvOC_Iiph2y-FfETEO55qDPeNM';
//   var gid = '0';
//   var url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=out:json&tq&gid=' + gid;
//   var constData = undefined;

//   function getJsonItems() {
//     if (constData !== undefined) {
//       return new Promise((r, e) => r(constData));
//     }
//     return fetch(url)
//       .then(response => response.text())
//       .then((data) => {
//         enableSubmitButton()
//         return fetchItems(data.slice(47, -2))
//       }).catch((e) => console.error(e));
//   }
//   constData = getJsonItems();
// }

function getJsonItems(url: string) {

    return fetch(url)
        .then(response => response.text())
        .then((data) => {
            return fetchItems(data.slice(47, -2))
        }).catch((e) => console.error(e));
}

export const fetchSpreadSheetJson = async (spreadSheetId: string, gid: string) => {
    const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=${gid}`;
    return await getJsonItems(url)
}