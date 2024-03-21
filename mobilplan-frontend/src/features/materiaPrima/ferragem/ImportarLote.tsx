import React, {useRef, useState} from 'react';
import {Box, Grid, List, ListItem, Paper, Typography,} from '@mui/material';
import {ImportacaoFerragem} from '../../../types/ferragem';
import CustomButton from "../../../components/CustomButtons/CustomButton";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {useSnackbar} from "notistack";
import {useUploadFerragemPlanilhaMutation} from "./ferragemSlice";
import Avatar from "@mui/material/Avatar";

export const ImportarLote = () => {
    const [uploadResult, setUploadResult] = useState<ImportacaoFerragem | null>(null);
    const [uploadFerragem] = useUploadFerragemPlanilhaMutation();
    const { enqueueSnackbar } = useSnackbar();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDownloadExample = () => {
        const link = document.createElement('a');
        link.href = process.env.PUBLIC_URL + '/importar-ferragem.csv';
        link.setAttribute('download', 'importar-ferragem.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleUploadCSV = async (file: File) => {
        setUploadResult(null);
        try {
            const result = await uploadFerragem(file).unwrap();
            setUploadResult(result);
            enqueueSnackbar('Upload realizado com sucesso!', { variant: 'success' });
        } catch (error) {
            console.error('Erro ao fazer upload da planilha:', error);
            enqueueSnackbar('Erro ao realizar upload.', { variant: 'error' });
        }
    };
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            handleUploadCSV(file).then(r => console.log('Upload realizado com sucesso!'));
        }
    };
    return (
        <Box maxWidth="lg" sx={{height: 650, mt: 4, mb: 4}}>
            <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileInputChange}
                style={{display: 'none'}}
            />
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={12} sm={4}>
                    <Typography
                        sx={{

                            typography: {
                                xs: "h6",
                                sm: "h6",
                                md: "h5",
                                lg: "h5",
                            },
                        }}
                    >
                        Importar em Lote
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    display="flex"
                    justifyContent="flex-end"
                    gap={1}
                >
                    <CustomButton
                        label={"Download Planilha Exemplo"}
                        icon={<FileDownloadIcon/>}
                        largura="100px"
                        variant="outlined"
                        color="secondary"
                        onClick={handleDownloadExample}
                        sx={{
                            mb: {xs: ".5rem", sm: "1rem"},
                            pl: 3, pr: 3,
                            height: 36,
                            minHeight: 36,
                            fontSize: {xs: 10, sm: 12, md: 14},
                            ':hover': {
                                //     color: '#3d3835',
                                bgcolor: 'rgba(180,180,180,0.5)',
                            }
                        }}/>
                    <CustomButton
                        label={"Upload Planilha CSV"}
                        icon={<FileUploadIcon/>}
                        largura="100px"
                        variant="contained"
                        color="secondary"
                        onClick={() => fileInputRef.current?.click()}
                        sx={{
                            mb: {xs: ".5rem", sm: "1rem"},
                            pl: 3,
                            pr: 3,
                            height: 36,
                            minHeight: 36,
                            fontSize: {xs: 10, sm: 12, md: 14},
                            ':hover': {
                                color: '#3d3835',
                                bgcolor: 'rgba(38, 95, 41, 0.5)',
                            }
                        }}/>
                    <CustomButton
                        label={"Voltar"}
                        icon={null}
                        largura="200px"
                        variant="outlined"
                        color="secondary"
                       forwardTo={'/ferragem'}
                        sx={{
                            width: 120,
                            mb: {xs: ".5rem", sm: "1rem"},
                            pl: 3,
                            pr: 3,
                            height: 36,
                            minHeight: 36,
                            fontSize: {xs: 10, sm: 12, md: 14},
                            ':hover': {
                                height: 36,
                                maxHeight: 36,
                                color: 'white',
                                fontWeight: '600',
                                bgcolor: 'secondary.light',
                                borderColor: 'secondary.dark',
                            },
                        }}/>
                </Grid>
            </Grid>
            <Paper sx={{p: 2}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2}}>
                    <Paper
                        sx={{p: 2, flex: 1, overflow: 'auto', height: 400, maxHeight: 400, border: '1px solid #ccc'}}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Ferragens Importadas
                        </Typography>
                        <List>
                            {uploadResult?.ferragensImportadas?.map((item, index) => (
                                <ListItem key={index}><Avatar>{index + 1}</Avatar>   {item}</ListItem>
                            ))}
                        </List>
                    </Paper>
                    <Paper
                        sx={{p: 2, flex: 1, overflow: 'auto', height: 400, maxHeight: 400, border: '1px solid #ccc'}}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Ferragens Existentes
                        </Typography>
                        <List>
                            {uploadResult?.ferragensExistentes?.map((item, index) => (
                                <ListItem key={index}><Avatar>{index + 1}</Avatar>   {item}</ListItem>
                            ))}
                        </List>
                    </Paper>
                    <Paper
                        sx={{p: 2, flex: 1, overflow: 'auto', height: 400, maxHeight: 400, border: '1px solid #ccc'}}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Ferragens Não Importadas
                        </Typography>
                        <List>
                            {uploadResult?.ferragensNaoImportadas?.map((item, index) => (
                                <ListItem key={index}><Avatar>{index + 1}</Avatar>   {item}</ListItem>
                            ))}
                        </List>
                    </Paper>
                </Box>
            </Paper>
        </Box>
    );
};
