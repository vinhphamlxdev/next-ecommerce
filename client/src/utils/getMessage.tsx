import * as React from "react";
import Swal from "sweetalert2";

export default function getMessage(values: string, status: any) {
  return Swal.fire({
    text: values,
    icon: status,
  });
}
