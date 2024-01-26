import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { fixNumbers } from 'src/utils/functions';

/**
 * This class implements the PipeTransform interface, 
 * which means it will have to provide a transform method.
 */
@Injectable()
export class AllProductsPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {

        /**
         * extract page number from request query
        */
        value.page ? value.page = +fixNumbers(value.page) : value.page = 1

        /**
         * extract page limit from request query
        */
        value.limit ? value.limit = +fixNumbers(value.limit) : value.limit = 5

        return value
    }

}