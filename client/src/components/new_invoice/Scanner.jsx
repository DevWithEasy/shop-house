import { useZxing } from "react-zxing";
import audioFile from './../../assets/store-scanner-beep.mp3';

const BarcodeScanner = ({ handleScanSearch,setScaneSearch,audioRef }) => {
    const { ref } = useZxing({
        onDecodeResult(result) {
            setScaneSearch(result.getText())
            handleScanSearch(result.getText());
        },
    });
    return (
        <div
            className='absolute right-0 bottom-0 w-[80px] h-[80px] mr-4 p-2 z-10 overflow-hidden rounded-md'
        >
            <video
                ref={ref}
                className='w-[100%] bg-cover'
            />
            <audio ref={audioRef}>
                <source src={audioFile} type="audio/mp3" />
            </audio>
        </div>
    );
};

export default BarcodeScanner;
