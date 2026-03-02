// RTE.jsx -> Real-Time Editor Component
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form'; // It is same like forwardRef hook of React
import configEnv from '../../config/configEnv';

function RTE({
    control, // responsible for connecting RTE with another form elements
    name,
    label,
    defaultValue = ''
}) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-2 font-bold uppercase tracking-wider text-sm'>{label}</label>}

            <div className="border-brutal shadow-brutal-sm transition-all hover:shadow-brutal focus-within:translate-x-1 focus-within:translate-y-1 focus-within:shadow-none">
                <Controller // pass control from here to RTE
                    name={name || 'Content'}
                    control={control}
                    render={({ field: { onChange } }) => (
                        <Editor
                            apiKey={configEnv.tinymceApiKey}
                            initialValue={defaultValue}
                            init={
                                {
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        "image",
                                        "advlist",
                                        "autolink",
                                        "lists",
                                        "link",
                                        "image",
                                        "charmap",
                                        "preview",
                                        "anchor",
                                        "searchreplace",
                                        "visualblocks",
                                        "code",
                                        "fullscreen",
                                        "insertdatetime",
                                        "media",
                                        "table",
                                        "code",
                                        "help",
                                        "wordcount",
                                        "anchor"
                                    ],
                                    toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                                }
                            }
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    )
}

export default RTE;
