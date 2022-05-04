import axios from "axios";
import swal from "sweetalert";

const handleDelete = (id) => {
  const url = `http://localhost:5000/inventory/${id}`;
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this product!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete(url).then((response) => {
        if (response.data.deletedCount > 0) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        }
      });
    }
  });
};
export default handleDelete;
