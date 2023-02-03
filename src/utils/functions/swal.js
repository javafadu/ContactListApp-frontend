import Swal from "sweetalert2";


export const questionConfirmCancel = (title, text = "") => {
    return Swal.fire({
        title: title,
        text: text,
        icon: "question",
        showCancelButton: true,

    });

}