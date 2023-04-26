import { Router } from "express";
import { ObjectId } from "bson";

import { find } from '../../services/database/find';
import { insert } from '../../services/database/insert';
import { update } from '../../services/database/update';
import { remove } from '../../services/database/delete';
import { Information } from "../../types/informations";

export const informationsRouter = Router();

informationsRouter.get('/', async (req, res) => {
    const searched = await find('informations', {});
    if (searched) {
        return res.status(searched.success ? 201 : 500).json(searched);
    }
    return res.status(500).json({
        success: false,
        searched: null,
        error: 'Informations list shearching error',
    });
});

informationsRouter.get('/categories', async (req, res) => {
    const searched = await find('informations', {});
    if (searched) {
        return res.status(searched?.success ? 200 : 500).json(searched);
    }
    return res.status(200).json({
        success: false,
        searched: null,
        error: 'Error',
    });
});

informationsRouter.get('/category/:category', async (req, res) => {
    if (req.params.category) {
        const category = req.params.category;
        const searched = await find('informations', { category });
        return res.status(searched?.success ? 200 : 500).json(searched);
    }
    return res.status(200).json({
        success: false,
        searched: null,
        error: 'Invalid parameter request',
    });
});

informationsRouter.get('/category/:category/:title', async (req, res) => {
    if (req.params.category && req.params.title) {
        const category = req.params.category;
        const title = req.params.title;
        const searched = await find('informations', { category, title });
        return res.status(searched?.success ? 200 : 500).json(searched);
    }
    return res.status(200).json({
        success: false,
        searched: null,
        error: 'Invalid parameter request',
    });
});

informationsRouter.post('/', async (req, res) => {
    if (req.body) {
        const information = req.body as Information;
        if ((information) && information.category && information.title && information.description) {
            const inserted = await insert('informations', {
                category: information.category,
                title: information.title,
                description: information.description
            }, information);
            return res.status(inserted?.success ? 201 : 500).json(inserted);
        }
    }
    return res.status(400).json({
        success: false,
        inserted: null,
        error: 'Invalid request body',
    });
});

informationsRouter.put('/:id', async (req, res) => {
    if ((req.params.id) && (req.body)) {
        const information = req.body as Information;
        if (information) {
            const updated = await update('informations', { _id: new ObjectId(req.params.id) }, information);
            return res.status(updated?.success ? 200 : 500).json(updated);
        }
    }
    return res.status(400).json({
        success: false,
        updated: null,
        error: 'Invalid parameters or request body',
    });
});

informationsRouter.delete('/:id', async (req, res) => {
    if (req.params.id) {
        const deleted = await remove('informations', { _id: new ObjectId(req.params.id) });
        return res.status(deleted?.success ? 200 : 500).json(deleted);
    }
    return res.status(400).json({
        success: false,
        updated: null,
        error: 'Invalid request parameters',
    });
});