import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Container } from './styles';

function DownloadReport() {
  const toastId = useRef(null);
  const [downloadIsDisabled, setDownloadIsDisabled] = useState(false);

  const downloadPDF = async () => {
    const userToken = localStorage.getItem('token');
    toastId.current = toast.success('Your download was started!');

    if (userToken) {
      try {
        setDownloadIsDisabled(true);

        const requestConfig = {
          url: 'http://localhost:8080/pdf/create/users-report',
          header: {
            method: 'POST',
            headers: new Headers({ authorization: `Bearer ${userToken}` })
          }
        };

        fetch(requestConfig.url, requestConfig.header)
          .then(response => response.blob())
          .then(blob => {
            setDownloadIsDisabled(false);
            toast.dismiss(toastId.current);
            const link = document.createElement('a');

            link.href = window.URL.createObjectURL(new Blob([blob]));
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);

            link.click();
            link.parentNode.removeChild(link);
          });
      } catch (error) {
        setDownloadIsDisabled(false);
        toast.dismiss(toastId.current);
        toast.error(error.response.data.message, { autoClose: 3000 });
      }
    } else {
      toast.error('Sign up first to do that!', { autoClose: 3000 });
    }
  };
  return (
    <Container>
      <button disabled={downloadIsDisabled} onClick={downloadPDF}>
        Download
      </button>
    </Container>
  );
}

export default DownloadReport;
