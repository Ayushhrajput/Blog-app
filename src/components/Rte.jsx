import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function Rte({control, name, label, defaultValue=''}) {
    return (
        <div>
            {label && <label className='inline mb-1 pl-1'>{label}</label>}
            <Controller
                control={control}
                name={name || 'content'}
                render={({field: {onchange}}) => (
                    <Editor
                    apiKey='oecz49mtjkwsgobx1c7qbi5u159zfbwy1v78tsbhou6d6nl3'
                    init={{
                        initialValue: {defaultValue},
                        height: 400,
                        plugins: [
                        
                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                        
                        'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
                        ],
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                        ],
                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                        uploadcare_public_key: 'afafc0c0f85667563bf6',
                    }}
                    initialValue={defaultValue}
                    onEditorChange={onchange}
                    />

                )}
            />
        </div>
        
    )
}

export default Rte;