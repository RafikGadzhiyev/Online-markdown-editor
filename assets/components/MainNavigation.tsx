// Libraries and frameworks
import React from 'react';
import styled from 'styled-components';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// Hooks
import { useSelector, useDispatch } from 'react-redux';
// Types
import type { File } from '../../pages';
import type { RootState } from '../redux/store';
// Actions
import { updateFile, deleteFile, selectFile } from './../redux/slices/FileActions.slice'
// Components
import { FileNavigation } from './FileNavigation';

// Local styled components
const NavigationContainer = styled.header`
    width: 100%;
    height: 3.5rem;
    background-color: #2c2d30;
    color: #fff;
    padding: 0 1rem 0 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    align-items: center;
`;
const NavigationLeftSideContainer = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    gap: 1rem;
`;
const NavigationRightSideContainer = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    padding: .5rem 0;
`;
const OpenMenuButton = styled.button`
    font-size: 2rem;
    height: 3.5rem;
    width: 3.5rem;
    background-color: #35383e;
    text-align: center;
`;
const AppName = styled.span`
    margin-right: 1rem;
    position: relative;
    text-transform: uppercase;
    letter-spacing: .25rem;

    &::after{
        content: '';
        width: 2px;
        height: 200%;
        position: absolute;
        background-color: #35383e;
        right: -1rem;
        top: -50%;
    }

`;
const DocumentDataContainer = styled.div`
    display: flex;
    gap: .5rem;
    align-items: center;
`
const DocumentDataWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const DocumentNameText = styled.span`
    font-size: .6rem;
    color: #a4a6a9;
`;
const DocumentName = styled.span``;
const DeleteButton = styled.button``;
const SaveButton = styled.button`
    display: flex;
    align-items: center;
    gap: .5rem;
`;

const DownloadButton = styled.button`
    transition: 300ms ease;

    &:hover{
        color: yellowgreen;
    }

`;



interface IProps extends React.PropsWithChildren {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    fileState: File | null,
}

export const MainNavigation: React.FC<IProps> = ({ isOpen, setIsOpen, fileState }) => {
    const [isFileNavigationOpen, setIsFileNavigationOpen] = React.useState<boolean>(false);
    const store: RootState = useSelector((store: RootState) => store);
    const dispatch: React.Dispatch<any> = useDispatch();
    const chosenFile = React.useRef<File | null>(null);

    //! Test zone
    // TODO: create beautiful stylesheet for pdf file 
    // TODO: creating link only when file saved
    const StylesSheets = StyleSheet.create({
        page: {
            display: 'flex',
            flexDirection: 'column',
        },
        topSection: {
            width: '100%',
            backgroundColor: '#FFA191',
            padding: '25px 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        textSection: {
            width: '100%',
            backgroundColor: '#FFE0DA',
            padding: '10px 15px',
        },
        textContent: {
            textAlign: 'justify',
            fontSize: '14px',
            lineHeight: '25px'
        }
    })

    const MainDocument = () => {
        return <Document>
            <Page
                size='A4'
                style={StylesSheets.page}
            >
                <View
                    style={StylesSheets.topSection}
                // render={() => {
                //     let fileData;
                //     for (let file of store.fileSlice.data.files) {
                //         if (file.id === store.fileSlice.data.currentFile) {
                //             fileData = file.name
                //         }
                //     }

                //     return <Text>{
                //         fileData
                //     }</Text>
                // }}
                >
                    This is beta version of pdf file. This functionality will work good as soon as possible. Best regards, developer
                </View>
                <View
                    style={StylesSheets.textSection}
                    render={() => {
                        let fileData;
                        for (let file of store.fileSlice.data.files) {
                            if (file.id === store.fileSlice.data.currentFile) {
                                fileData = file.content
                            }
                        }

                        return <Text
                            style={StylesSheets.textContent}
                        >{
                                fileData
                            }</Text>
                    }}
                >

                </View>

            </Page>
        </Document>
    }
    //! Test zone

    React.useEffect(() => {
        for (let file of store.fileSlice.data.files) {
            if (file.id === store.fileSlice.data.currentFile) {
                chosenFile.current = file;
            }
        }
    }, [store])

    const saveFileContentHandler = () => {
        if (fileState) {
            dispatch(updateFile({ id: store.fileSlice.data.currentFile, content: fileState.content }));
            alert("Saved!");
        }
    }

    const deleteFileHandler = () => {
        if (fileState) {
            dispatch(deleteFile(fileState.id));
            alert('Deleted!')
            if (store.fileSlice.data.files.length) {
                dispatch(selectFile(store.fileSlice.data.files[0].id))
            }
        }
    }

    return <>
        <FileNavigation
            isOpen={isFileNavigationOpen}
            setIsOpen={setIsFileNavigationOpen}
            isModalOpen={isOpen}
            setIsModalOpen={setIsOpen}
        />
        <NavigationContainer>
            <NavigationLeftSideContainer>
                <OpenMenuButton
                    onClick={() => setIsFileNavigationOpen(() => true)}
                >
                    <i className="bi bi-list"></i>
                </OpenMenuButton>
                <AppName>MarkDown</AppName>
                {
                    store.fileSlice.data.currentFile && chosenFile.current &&
                    <DocumentDataContainer>
                        <i className="bi bi-file-earmark"></i>
                        <DocumentDataWrapper>
                            <DocumentNameText>Document name</DocumentNameText>
                            <DocumentName>{chosenFile.current.name}</DocumentName>
                        </DocumentDataWrapper>
                    </DocumentDataContainer>
                }
            </NavigationLeftSideContainer>
            {
                store.fileSlice.data.currentFile && chosenFile.current &&
                <NavigationRightSideContainer>
                    <DeleteButton
                        onClick={() => deleteFileHandler()}
                    >
                        <i className="bi bi-trash"></i>
                    </DeleteButton>
                    <SaveButton
                        onClick={() => saveFileContentHandler()}
                    >
                        <i className="bi bi-hdd"></i>
                        Save changes
                    </SaveButton>
                    <PDFDownloadLink document={<MainDocument />} fileName={`${store.fileSlice.data.currentFile}.pdf`}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download now!'
                        }
                    </PDFDownloadLink>
                    {/* <DownloadButton>
                        Download file
                    </DownloadButton> */}
                </NavigationRightSideContainer>
            }
        </NavigationContainer>
    </>
}