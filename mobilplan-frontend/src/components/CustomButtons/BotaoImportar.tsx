import * as React from 'react';
import Button, {ButtonProps} from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

interface BotaoImportarProps extends ButtonProps {
    largura?: string;
    larguraBotaoMenu?: string;
    opcoes: string[];
    onDownload?: () => void; // Ação de download
    onUpload?: (file: File) => Promise<void>; // Ação de upload
}
interface Option {
    label: string;
    action: () => void; // Função a ser chamada quando a opção é selecionada
}

const BotaoImportar: React.FC<BotaoImportarProps> = ({   largura,
                                                         larguraBotaoMenu,
                                                         opcoes,
                                                         onDownload, onUpload,
                                                         ...props
                                                     }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0); // Pode querer iniciar com 0 ou uma prop defaultIndex
    const inputRef = React.useRef<HTMLInputElement>(null);

    // const handleClick = () => {
    //     onOpcaoSelecionada(selectedIndex);
    // };

    const handleMenuItemClick = async (event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
        setSelectedIndex(index);
        setOpen(false);
        if (index === 0 && onDownload) {
            onDownload();
        } else if (index === 1 && onUpload && inputRef.current) {
            inputRef.current.click(); // Abre o seletor de arquivos
        }
    };

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            <input
                type="file"
                accept=".csv"
                hidden
                ref={inputRef}
                onChange={async (e) => {
                    if (e.target.files && e.target.files[0] && onUpload) {
                        await onUpload(e.target.files[0]);
                    }
                }}
            />
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button"
                         sx={{width: largura, mb: {xs: '.5rem', sm: '.5rem', md: '1rem', lg: '1rem'},}}>
                <Button {...props} >{opcoes[selectedIndex]}</Button>
                <Button sx={{width: larguraBotaoMenu, ...props.sx}} size="small"
                        aria-controls={open ? 'split-button-menu' : undefined} aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="menu" onClick={handleToggle}>
                    <ArrowDropDownIcon/>
                </Button>
            </ButtonGroup>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal
                    sx={{zIndex: 1200}}>
                {({TransitionProps, placement}) => (
                    <Grow {...TransitionProps}
                          style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',}}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {opcoes.map((opcao, index) => (
                                        <MenuItem key={opcao} selected={index === selectedIndex}
                                                  onClick={(event) => handleMenuItemClick(event, index)}>
                                            {opcao}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
};
export default BotaoImportar;
