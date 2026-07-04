import { Wallet } from '../domain/model/wallet.entity';
import { CreateWalletRequest } from '../domain/model/create-wallet.request';
import { CreateWalletResource, WalletResource } from './wallet-response';

export class WalletAssembler {
    toEntityFromResource(resource: WalletResource): Wallet {
        return new Wallet({
            id: resource.id,
            tutorId: resource.tutorId,
            balance: resource.balance,
            currency: resource.currency,
            bankName: resource.bankName,
            accountNumber: resource.accountNumber,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        });
    }

    toResourceFromCreateRequest(request: CreateWalletRequest): CreateWalletResource {
        return {
            tutorId: request.tutorId,
            currency: request.currency,
            bankName: request.bankName,
            accountNumber: request.accountNumber,
        };
    }
}