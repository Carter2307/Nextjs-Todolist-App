//Arrays
Array.prototype.isEmpty = function () {
  return this.length === 0;
};

/**
 * Tri un tableau d'objet par clé de manière croissant (asc) ou décroissant (desc)
 * @param property
 * @param order
 * @return Array
 */
Array.prototype.objectSort = function (property: string, order: "asc" | "desc") {
  const arr = this;

  const ascSort = (a: any, b: any) => {
    if (a[property] > b[property]) {
      return 1;
    } else {
      return -1;
    }
  };

  const descSort = (a: any, b: any) => {
    if (a[property] > b[property]) {
      return -1;
    } else {
      return 1;
    }
  };

  switch (order) {
    case "asc":
      return arr.sort(ascSort);

    case "desc":
      return arr.sort(descSort);

    default:
      return arr.sort();
  }
};

/**
 * Supprime les éléments dupliqués dans un tableau d'objet en fonction d'une propriété
 */
Array.prototype.removeDuplicatedObj = function (property: string) {
  const arr = [...this];

  for (let i = 0; i <= arr.length - 1; i++) {
    for (let j = i + 1; j <= arr.length - 1; j++) {
      if (arr[i][property] === arr[j][property]) {
        const elIndex = arr.indexOf(arr[j]);
        //delete element in array if exist
        if (elIndex > -1) {
          arr.splice(elIndex, 1);
        }
      }
    }
  }

  return arr;
};

export {};
