export type Complaint = {
    _id?: string;
    title: string;
    reportingDate?: Date;
    type: string;
    description: string;
}

export type Complaints = Complaint[];