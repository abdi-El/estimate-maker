import { Modal, ModalProps } from 'antd'
import { EstimateWithRelated } from '../../types/data'

export interface EtiamteModalProps extends ModalProps {
    estimate: EstimateWithRelated
}

export default function EstimateModal({
    estimate,
    ...modalProps
}: EtiamteModalProps) {
    return (
        <Modal title="Preventivo" centered {...modalProps} width={'80vw'}>
            "AAA"
        </Modal>
    )
}
