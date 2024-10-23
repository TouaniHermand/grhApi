interface StoreUserType {
    nom: string,
    prenom: string,
    email: string,
    contact: string,
    password: string,
    role?: string,
    departementId: number,
}

interface StoreDepartementType  {
    nom: string
}

interface UpdateDepartementType {
    id : number,
    nom?: string,
}

interface UpdateEmployeType  {
    id: number,
    nom?: string,
    prenom?: string,
    email?: string,
    contact?: string,
    role?: string,
    departementId?: number,
}


interface storePresence {
    heure_depart: string,
    heure_arrivee: string,
    jours_present:number;
    mois: string,
    employeId:number
}

interface storeCandidat {
    nom: string,
    prenom: string,
    date_naissance: string,
    email: string,
    experience_1: string,
    experience_2?: string,
    experience_3?: string,
    diplomes: string,
    domaine: string,
    lettre_motivation: string,
    annees_experience: number,
    thumbnailFile: string,
    status?: string
}


interface UpdateCandidateType  {
    id: number,
    status?: string,
}

interface CreateEventType  {
    heure: string,
    date_naissance : string
}