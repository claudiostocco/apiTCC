import { Router } from "express";
import { ObjectId } from "bson";

import { find } from '../../services/database/find';
import { insert } from '../../services/database/insert';
import { update } from '../../services/database/update';
import { remove } from '../../services/database/delete';
import { Complaint } from "../../types/complaints";

export const complaintsRouter = Router();

complaintsRouter.get('/', async (req, res) => {
    const searched = await find('complaints', {});
    if (searched) {
        return res.status(searched.success ? 201 : 500).json(searched);
    }
    return res.status(500).json({
        success: false,
        searched: null,
        error: 'Complaints list shearching error',
    });
});

complaintsRouter.get('/title/:title', async (req, res) => {
    if (req.params.title) {
        const title = new RegExp(req.params.title, 'i');
        const searched = await find('complaints', { title });
        return res.status(searched?.success ? 200 : 500).json(searched);
    }
    return res.status(200).json({
        success: false,
        searched: null,
        error: 'Invalid parameter request',
    });
});

complaintsRouter.get('/type/:type', async (req, res) => {
    if (req.params.type) {
        const title = req.params.type;
        const searched = await find('complaints', { title });
        return res.status(searched?.success ? 200 : 500).json(searched);
    }
    return res.status(200).json({
        success: false,
        searched: null,
        error: 'Invalid parameter request',
    });
});

complaintsRouter.post('/', async (req, res) => {
    if (req.body) {
        const complaint = req.body as Complaint;
        if ((complaint) && complaint.type && complaint.title && complaint.description) {
            const reportingDate = complaint.reportingDate 
                    ? complaint.reportingDate
                    : Date.now();
            const inserted = await insert('complaints', {
                title: complaint.title,
                reportingDate: reportingDate,
                type: complaint.type,
                description: complaint.description,
            }, complaint);
            return res.status(inserted?.success ? 201 : 500).json(inserted);
        }
    }
    return res.status(400).json({
        success: false,
        inserted: null,
        error: 'Invalid request body',
    });
});

complaintsRouter.put('/:id', async (req, res) => {
    if ((req.params.id) && (req.body)) {
        const complaint = req.body as Complaint;
        if (complaint) {
            const updated = await update('complaints', { _id: new ObjectId(req.params.id) }, complaint);
            return res.status(updated?.success ? 200 : 500).json(updated);
        }
    }
    return res.status(400).json({
        success: false,
        updated: null,
        error: 'Invalid parameters or request body',
    });
});

complaintsRouter.delete('/:id', async (req, res) => {
    if (req.params.id) {
        const deleted = await remove('complaints', { _id: new ObjectId(req.params.id) });
        return res.status(deleted?.success ? 200 : 500).json(deleted);
    }
    return res.status(400).json({
        success: false,
        updated: null,
        error: 'Invalid request parameters',
    });
});