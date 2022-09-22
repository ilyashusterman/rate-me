
export interface FormRefrence {
    current: HTMLFormElement
}
export class FormUpload {
    private formRef: FormRefrence
    constructor(formRef: FormRefrence) {
        this.formRef = formRef
    }
    async submit() {
        const formData = this.getFormData();
        await fetch(this.formRef.current.action, {
            method: this.formRef.current.method,
            body: formData,
            cache: "no-cache",
            mode: "no-cors",
        });
    }

    private getFormData() {
        const formDataParams: any = new FormData(this.formRef.current);
        const formData = new URLSearchParams();
        for (const pair of formDataParams) {
            formData.append(pair[0], pair[1]);
        }
        return formData;
    }
}