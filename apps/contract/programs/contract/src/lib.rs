use anchor_lang::prelude::*;

declare_id!("DmzXrTkrEZMubw5Sv1SjbR9bPJVp1qY2QKbLn31TE3JT");

#[program]
pub mod contract {
    use super::*;

    // create-quiz -> staking is true
    // transfer-prize-to-winner

    pub fn create_quiz(ctx: Context<CreateQuiz>, id: String) -> Result<()> {
        Ok(())
    }

    pub fn transfer_prize(ctx: Context<TransferPrize>, account: String) -> Result<()> {
        Ok(())
    }

}