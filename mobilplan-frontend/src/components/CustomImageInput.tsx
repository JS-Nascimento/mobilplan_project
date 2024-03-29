import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Button, FormControl, FormHelperText, InputLabel} from "@mui/material";

interface ImageInputProps {
    name: string;
    label: string;
    error?: boolean;
    helperText?: string;
    imageUrl?: string;
    onImageChange?: (selectedFileState: SelectedFileState) => void;
}

interface SelectedFileState {
    deleteImage: boolean;
    file: File | null;
}

const CustomImageInput: React.FC<ImageInputProps> = ({name, label, imageUrl, error, helperText, onImageChange}) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(imageUrl || null);
    const [isImageSelected, setIsImageSelected] = useState<boolean>(!!imageUrl);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        setImagePreviewUrl(imageUrl || null);
        setIsImageSelected(!!imageUrl);
    }, [imageUrl]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
                fileInputRef.current.files = null;
            }

            const reader = new FileReader();
            reader.onload = function (e) {
                setImagePreviewUrl(e.target?.result as string);
            };

            reader.readAsDataURL(file);
            setIsImageSelected(true);
            onImageChange?.({deleteImage: false, file: file});
        } else {
            setIsImageSelected(true);
            onImageChange?.({deleteImage: false, file: null});
        }
    };

    const handleClearImage = () => {
        setImagePreviewUrl("");
        setIsImageSelected(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
            fileInputRef.current.files = null;
            onImageChange?.({deleteImage: true, file: null});
        }
    };

    return (
        <FormControl fullWidth error={!!error} component="fieldset" variant="standard" sx={{mt: 1}}>
            <InputLabel
                shrink={isImageSelected}
                htmlFor={name}
                sx={{
                    transform: isImageSelected ? 'translate(0, -1.5em)' : 'none',
                    transition: 'transform 0.3s',
                    mb: 1,
                    ml: 1,
                    alignSelf: 'flex-start',
                    fontSize: isImageSelected ? '0.75rem' : '1rem',
                }}
            >
                {label}
            </InputLabel>
            <Box sx={{
                border: '0.3px solid #ced4da',
                borderRadius: 1,
                padding: 1,
                width: 200, // Define explicitamente a largura do box da imagem
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                mb: 1,
            }}>
                {imagePreviewUrl && (
                    <Box
                        component="img"
                        sx={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                        }}
                        src={imagePreviewUrl}
                        alt="Image preview"
                    />
                )}
            </Box>
            <Box
                gap={1}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    px: 1,
                    width: 200,
                }}> {/* Alinha os botões ao box da imagem */}
                <Button
                    variant="contained"
                    component="label"
                    sx={{flexGrow: 1}}
                >
                    Upload
                    <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        name={name}
                        accept="image/png, image/jpeg"
                        onChange={handleImageChange}
                    />
                </Button>
                {isImageSelected && (
                    <Button
                        variant="outlined"
                        onClick={handleClearImage}
                        sx={{flexGrow: 1}}
                    >
                        Limpar
                    </Button>
                )}
            </Box>
            {!!error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default CustomImageInput;
