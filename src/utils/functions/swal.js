import Swal from "sweetalert2";


export const questionConfirmCancel = (title, text = "") => {
    return Swal.fire({
        title: title,
        text: text,
        icon: "question",
        showCancelButton: true,

    });
};

export const toast = (title, icon = "info") => {
    /* info , success, warning, error, question*/
    return Swal.fire({
        position: "top-end",
        icon,
        title,
        showConfirmButton: false,
        timer: 3000,
    });
};